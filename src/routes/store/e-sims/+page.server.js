/** @type {import('./$types').PageServerLoad} */
export async function load({fetch}) {
    const req = await fetch('/api/e-sims');
    const {e_sim} = await req.json();

    console.log(e_sim);

    return {
        e_sim
    }
};