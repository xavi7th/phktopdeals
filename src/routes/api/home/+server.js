import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export function GET({setHeaders}) {

  setHeaders({
    'Cache-Control': 'max-age=604800, stale-while-revalidate=86400, immutable',
  })

  return json({
    foo: 'bar'
  });
}
