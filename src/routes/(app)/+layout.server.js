/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals }) {
	const req = await fetch('/api/home');
  const { main_nav } = await req.json();

	return { main_nav, user: locals.user };
}
