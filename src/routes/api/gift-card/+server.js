import { json } from "@sveltejs/kit";
import { gift_cards } from "../home/data";

/** @type {import('./$types').RequestHandler} */
export function GET() {
  return json({gift_cards});
}
