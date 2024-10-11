import { api } from '$lib/helpers';
import { dev } from "$app/environment";
import cookie, { parse } from 'cookie';
import { sequence } from '@sveltejs/kit/hooks';
import { handleDeviecDetector } from 'sveltekit-device-detector';

/** @type {import('@sveltejs/kit').Handle} */
async function logger({event, resolve}){
  const start_time = Date.now();

  //Await here. Run other hooks AND LOAD FUNCTIONS then come back here to continue
  const response = await resolve(event)

  if ( dev ) {
    console.log(`
      INTERNAL REQUEST: ${Date.now() - start_time}ms ${event.locals.deviceName} ${event.request.method} ${event.url.pathname}
    `)
  }

  return response;
}

/** @type {import('@sveltejs/kit').Handle} */
async function setCsrf({event, resolve}){

	const sessionName = import.meta.env.VITE_SESSION_NAME
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	event.locals.session = cookies[sessionName]

  const response = await resolve(event)

	if (!event.locals.session) {
		const sanctumRequest = await api({
			method: 'get',
			resource: 'sanctum/csrf-cookie',
      toBaseDomain: true,
      event,
		});

		if (sanctumRequest?.status === 204) {
			// set cookie in the client
			response.headers.set(
				'set-cookie',
				sanctumRequest?.headers.get('set-cookie') ?? ''
			)
		}
	}

  return response;
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

/** @type {import('@sveltejs/kit').Handle} */
async function getUserDetails({event, resolve}){
  if ( ! event.locals.user ) {

		const getUserDetails = await api({
			method: 'get',
			resource: 'user',
			event,
      logResponse:true
		});

    event.locals.user = (getUserDetails?.json())?.user
    event.locals.deviceName = event.locals.deviceType.isDesktop
                                ? `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''}`
                                : `${event.locals.deviceType?.mobileVendor || ''} ${event.locals.deviceType?.mobileModel || ''} ${event.locals.deviceType?.osVersion || ''}`;
	}

  return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
function authorize({event, resolve}){
  if ( ! event.locals.user ) {
    // and this is an auth route redirect to login page
	}

  return resolve(event);
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = ({request, fetch}) => {
  // console.log('request', request);

  return fetch(request)
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = ({event, error}) => {
  console.log('error', error);

  return {
    message: 'Oops',
    code: error?.code ?? 500,
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(handleDeviecDetector({}),logger, setCsrf, getUserDetails, authorize, addSecurityHeaders);
