import { json } from "@sveltejs/kit";

export function GET({ setHeaders }) {
  setHeaders({
    "Cache-Control": "private, max-age=60",
  });

  return json({
    foo: "bar",
  });
}
