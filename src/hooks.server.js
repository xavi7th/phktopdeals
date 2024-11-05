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
import { env } from '$env/dynamic/public';
import { sequence } from '@sveltejs/kit/hooks';
import { VITE_SESSION_NAME } from '$env/static/private';
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
	event.locals.session = cookies[VITE_SESSION_NAME]
  event.locals.user = {}

  // console.log({reqUrl: event.url.pathname, user: event.locals?.user, gettingDetails: event.locals.session && ! event.locals?.user && ! event.route.id?.includes('api/home') && ! event.request.url.includes('assets')});
  if (event.locals.session && ! Object.entries(event.locals?.user).length && ! event.route.id?.includes('api/home') && ! event.request.url.includes('assets')) {

		const getUserDetails = await api({
			method: 'get',
			resource: 'user',
			event,
		});

    if (getUserDetails?.status == 200) {
      //TODO: Set a localStorage with key user and expiration time for 5mins. If that key is present, no need to getUserDetails. @see https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
      event.locals.user = await getUserDetails?.json() //use this to determine auth on frontend. Before accessing auth routes if this is null redirect to login page
    }
	}

  event.locals.deviceName = event.locals.deviceType.isDesktop
                              ? `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''}`
                              : `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''} ${event.locals.deviceType?.osVersion || ''}`;

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
function authorize({event, resolve}){
  /**
   * @auth Protect routes that need authentication
   * NOTE: 303 will always redirect with GET, 307 will redirect with the original request method, while 302 is just 303 made popular
   */
  if (['/user', '/admin'].some(forbiddenUrlPattern => event.url.pathname.startsWith(forbiddenUrlPattern)) && ! event.locals?.user?.full_name) {
    redirect(303, '/login')
  }

  /**
   * @guest Protect guest routes
   */
  if (['/login', '/register'].some(guestRoutes => event.route.id?.includes(guestRoutes)) && event.locals?.user?.full_name) {
    if (event?.locals?.user?.is_admin) {
      redirect(303, '/admin/dashboard')
    }
    redirect(303, '/user/settings')
  }

  /**
   * @authorize Protect User routes from admins
   */
  if (event.url.pathname.startsWith('/user') && event.locals?.user?.is_admin) {
    redirect(303, '/admin/dashboard')
  }

  /**
   * @authorize Protect Admin routes
   */
  if (event.url.pathname.startsWith('/admin') && ! event.locals?.user?.is_admin) {
    redirect(303, '/logout')
  }

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
async function addSecurityHeaders({event, resolve}){
	const securityHeaders = { //@see https://edoverflow.com/2023/sveltekit-security-headers/
    'Cross-Origin-Embedder-Policy': 'credentialless',
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

   /**
   * @crsf Handle expired tokens and csrf expiry
   */
   if (response?.status == 419 && event.url.pathname.startsWith(env.PUBLIC_VITE_BASE_API)) {
    redirect(303, '/logout');
  }

  /** @type {import('set-cookie-parser').Cookie[]} */
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
export const handleError = ({event, error, message, status}) => {
  console.log('------------SERVER ERROR-----------');
  console.error({
    error,
    event: {
      url: event.url.href,
      locals: JSON.stringify(event.locals, null, 4),
    },
    message,
    status
  });

  if ( ! event.url.pathname.includes('assets')) {
    return {
      message,
      code: status ?? 500,
    }
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(handleDeviecDetector({}),logger, getUserDetails, authorize, addSecurityHeaders);
