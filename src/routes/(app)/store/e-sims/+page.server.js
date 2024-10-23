/** @type {import('./$types').PageServerLoad} */
export async function load({fetch}) {
    const req = await fetch('/api/e-sims');
    const {e_sim} = await req.json();

    return {
        e_sim
    }
};