import { json } from "@sveltejs/kit";
import { games } from "../home/data";

/** @type {import('./$types').RequestHandler} */
export function GET({params, url}) {
  return json({games});
}
