import { api } from '$lib/helpers';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  if ( ! event.locals.session) {
    await api({
      method: 'get',
      resource: 'sanctum/csrf-cookie',
      toBaseDomain: true,
      event,
    });
  }

  event.setHeaders({
    'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400, immutable',
  });

  return {}
}

/** @type {import('./$types').Actions} */
 export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {
		const form = await event.request.formData();

		const response = await api({
			method: 'post',
			resource: 'login',
			data: {
				'email': form.has('email') ? form.get('email') : undefined,
				'password': form.has('password') ? form.get('password') : undefined,
				'remember': form.has('remember') ? form.get('remember') : false,
        'device_name': event.locals.deviceName,
			},
      event,
		});

		if (response?.status == 422) {
			return fail(response?.status || 400, await response?.json());
		}

		if (response?.status == 419) {
			return fail(response?.status || 419, {message: 'Page has expired. Please reload and try again.'});
		}

    if ( ! response?.ok) {
      return fail(response?.status || 500, {message: response?.statusText || 'An error occured while processing your request'});
    }

		if (response?.status == 200 || response?.status == 201) {
      event.locals.user = (await response?.json())?.user;

      if (event?.locals?.user?.is_admin) {
        redirect(302, '/admin/dashboard')
      }

			throw redirect(302, '/user/settings')
		}
	},
}
