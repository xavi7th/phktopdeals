import { json } from "@sveltejs/kit";
import { main_nav } from "./data.js";

/** @type {import('./$types').RequestHandler} */
export function GET({setHeaders}) {

  setHeaders({
    'Cache-Control': 'max-age=604800, stale-while-revalidate=86400, immutable',
  })

  return json({
    main_nav,
  });
}
