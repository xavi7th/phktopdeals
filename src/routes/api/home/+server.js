import { json } from "@sveltejs/kit";
import { sections, product_types, filters } from "./data.js";

/** @type {import('./$types').RequestHandler} */
export function GET() {
  return json({
    sections,
    filters,
    main_nav: JSON.parse(JSON.stringify(product_types).replace(/type/g, 'name')),
  });
}
