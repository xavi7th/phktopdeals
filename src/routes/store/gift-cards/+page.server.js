/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const req = await fetch('/api/gift-card');
    const {gift_cards} = await req.json();

  return {
    gift_cards
  }
}