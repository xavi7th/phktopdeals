import { json } from "@sveltejs/kit";
import { e_sim } from "../home/data";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return json({e_sim});
};