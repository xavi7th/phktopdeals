import { json } from "@sveltejs/kit";
import { prod_desc } from "../../home/data";

export function GET({ params, url }) {
  return json({ prod_desc });
}
