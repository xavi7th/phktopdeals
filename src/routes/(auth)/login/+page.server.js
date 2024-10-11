import { api } from '$lib/helpers';
import { redirect, error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {

  /** @param {import('@sveltejs/kit').RequestEvent} event */
	default: async (event) => {
		const form = await event.request.formData();

    console.log({
      'email': form.has('email') ? form.get('email') : undefined,
      'password': form.has('password') ? form.get('password') : undefined,
      'rememberme': form.has('rememberme') ? form.get('rememberme') : false,
    });

		const response = await api({
			method: 'post',
			resource: 'login',
			data: {
				'email': form.has('email') ? form.get('email') : undefined,
				'password': form.has('password') ? form.get('password') : undefined,
				'remember': form.has('rememberme') ? form.get('rememberme') : false,
        'device_name': event.locals.deviceName,
			},
      event
		});

    console.log((new Error()).stack?.split('at')[1]);
    console.log('response', response);

		// if (response.status === 404) {
		// 	return {
		// 		body: []
		// 	};
		// }

		// if (response.status >= 200 && response.status <= 299) {
		// 	throw redirect(302, '/')
		// }

    if (!response.ok) {
      throw error(response.status, {
        msg: response?.statusText
      });
    }

		return {
			status: response.status,
      msg: 'Hello' // Available in form prop. export let form
		};
	},
}
