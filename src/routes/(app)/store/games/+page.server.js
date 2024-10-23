/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const req = await fetch('/api/games');
  const {games} = await req.json();

  return {
    games
  }
}
