import { api } from '$lib/helpers';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load ( event ) {
  if ( !event.locals.session ) {
    await api( {
      method: 'get',
      resource: 'sanctum/csrf-cookie',
      toBaseDomain: true,
      event,
    } );
  }

  event.setHeaders( {
    'Cache-Control': 'max-age=604800, stale-while-revalidate=86400, immutable',
  } );

  return {}
}

/** @satisfies {import('./$types').Actions} */
export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
  login: async ( event ) => {
    const form = await event.request.formData();

    const response = await api( {
      method: 'post',
      resource: 'login',
      data: {
        'email': form.has( 'login-email' ) ? form.get( 'login-email' ) : undefined,
        'password': form.has( 'login-password' ) ? form.get( 'login-password' ) : undefined,
        'remember': form.has( 'remember' ) ? form.get( 'remember' ) : false,
        'device_name': event.locals.deviceName,
      },
      event,
    } );

    if ( response?.status == 422 ) {
      return fail( response?.status || 400, await response?.json() );
    }

    if ( response?.status == 419 ) {
      return fail( response?.status || 419, { message: 'Page has expired. Please reload and try again.' } );
    }

    if ( !response?.ok ) {
      return fail( response?.status || 500, { message: response?.statusText || 'An error occured while processing your request' } );
    }

    if ( response?.status == 200 || response?.status == 201 ) {
      event.locals.user = ( await response?.json() )?.user;

      if ( event?.locals?.user?.is_admin ) {
        redirect( 302, '/admin/dashboard' )
      }

      throw redirect( 302, '/user/settings' )
    }
  },

  /** @param {import('@sveltejs/kit').RequestEvent} event */
  register: async ( event ) => {
    const form = await event.request.formData();

    const response = await api( {
      method: 'post',
      resource: 'register',
      data: {
        'full_name': form.has( 'full_name' ) ? form.get( 'full_name' ) : undefined,
        'email': form.has( 'register-email' ) ? form.get( 'register-email' ) : undefined,
        'password': form.has( 'register-password' ) ? form.get( 'register-password' ) : undefined,
        'password_confirmation': form.has( 'password_confirmation' ) ? form.get( 'password_confirmation' ) : undefined,
        'remember': form.has( 'remember' ) ? form.get( 'remember' ) : false,
        'device_name': event.locals.deviceName,
      },
      event
    } );

    if ( response?.status == 422 ) {
      return fail( response?.status || 400, await response?.json() );
    }

    if ( response?.status == 419 ) {
      return fail( response?.status || 419, { message: 'Page has expired. Please reload and try again.' } );
    }

    if ( !response?.ok ) {
      return fail( response?.status || 500, { message: response?.statusText || 'An error occured while processing your request' } );
    }

    if ( response?.status == 201 ) {
      throw redirect( 302, '/user/settings' )
    }
  },
}
