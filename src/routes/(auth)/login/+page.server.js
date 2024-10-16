import { api } from '$lib/helpers';
import { redirect, fail } from '@sveltejs/kit';

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
				'remember': form.has('rememberme') ? form.get('rememberme') : false,
        'device_name': event.locals.deviceName,
			},
      event,
		});

		if (response?.status == 422) {
			return fail(response?.status || 400, await response?.json());
		}

    if ( ! response?.ok) {
      return fail(response?.status || 500, {message: response?.statusText || 'An error occured while processing your request'});
    }

		if (response?.status == 200 || response?.status == 201) {
			throw redirect(302, '/user/settings')
		}
	},
}
