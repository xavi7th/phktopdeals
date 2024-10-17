/**
 * This hook fires on EVERY request handled by the server side router.
 *
 * The request goes from here to the load functions and then back here and from here the response is sent back to the client
 *
 * So this is more like a controller in Laravel that is responsible for receiving the request, forwarding it to processors and then sending it back to the browsr
 */

import { parse } from 'cookie';
import { api } from '$lib/helpers';
import scp from 'set-cookie-parser';
import { dev } from "$app/environment";
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleDeviecDetector } from 'sveltekit-device-detector';

/** @type {import('@sveltejs/kit').Handle} */
async function logger({event, resolve}){
  const start_time = Date.now();

  //Await here. Run other hooks AND LOAD FUNCTIONS then come back here to continue
  const response = await resolve(event)

  if ( dev && ! event.request.url.includes('assets') ) {
    console.log(`
      INTERNAL REQUEST: ${Date.now() - start_time}ms ${event.locals.deviceName} ${event.request.method} ${event.url.pathname}
    `)
  }

  return response;
}

/** @type {import('@sveltejs/kit').Handle} */
async function getUserDetails({event, resolve}){
  const cookies = parse(event.request.headers.get('cookie') || '')
	event.locals.session = cookies[import.meta.env.VITE_SESSION_NAME]

  if (event.locals.session && ! event.locals?.user && ! event.route.id?.includes('api/home') && ! event.request.url.includes('assets')) {
		const getUserDetails = await api({
			method: 'get',
			resource: 'user',
			event,
		});

    event.locals.user = await getUserDetails?.json() //use this to determine auth on frontend. Before accessing auth routes if this is null redirect to login page
	}

  event.locals.deviceName = event.locals.deviceType.isDesktop
                              ? `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''}`
                              : `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''} ${event.locals.deviceType?.osVersion || ''}`;

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
function authorize({event, resolve}){

  if ((event.url.pathname.startsWith('/user') && ! event.locals?.user?.name)) {
    redirect(303, '/login') //303 will always redirect with GET, 307 will redirect with the original request method, while 302 is just 303 made popular
  }

  if (event.route.id?.includes('(auth)') && event.locals?.user?.name) {
    redirect(303, '/user/settings')
  }

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
async function addSecurityHeaders({event, resolve}){
	const securityHeaders = { //@see https://edoverflow.com/2023/sveltekit-security-headers/
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    // 'Content-Security-Policy': 'script-src \'self\' \'nonce-Y70QFNhAVmer2wdobT8YoQ==\'',
    // 'Referrer-Policy': 'no-referrer',
    // 'Strict-transport-security': 'max-age=15552000; includeSubDomains',
    // 'X-Content-Type-Options': 'nosniff',
    // 'X-DNS-Prefetch-Control': 'off',
    // 'X-Download-Options': 'noopen',
    // 'X-Permitted-Cross-Domain-Policies': 'none',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '0',
  }
  const response = await resolve(event);

  Object.entries(securityHeaders).forEach(
      ([header, value]) => response.headers.set(header, value)
  );


  return response;
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({request, fetch, event}) => {
  const response = await fetch(request);

  /** @type {CookieSerializeOptions[]} */
  let cookies = scp.parse(response)

  //This will take care of updating the csrf cookies from our backend for us.
  if (cookies.length) {
    cookies.forEach(cookie => {
      event.cookies.set(cookie.name, cookie.value, {
        ...cookie,
        sameSite: cookie.sameSite,
        secure: !dev,
      });
    })
  }

  return response
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = ({event, error}) => {
  if ( ! event.request.url.includes('assets')) {
    console.log('------------SERVER ERROR-----------');
    console.error({event, error});

    return {
      message: error,
      code: error?.code ?? 500,
    }
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(handleDeviecDetector({}),logger, getUserDetails, authorize, addSecurityHeaders);
