import { api } from '$lib/helpers';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  await api({
    method: 'post',
    resource: 'logout',
    event
  });

  redirect(307, '/login');
}
