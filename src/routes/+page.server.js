/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const req = await fetch('/api/home');
  const {filters, sections} = await req.json();

  return {
    filters, sections
  }
}
