import { json } from "@sveltejs/kit";

export async function GET({ fetch, locals }) {
  const response = await fetch("/api/v1/admin/ai/status", {
    headers: {
      Authorization: `Bearer ${locals.user?.token || ""}`,
    },
  });

  const data = await response.json();
  return json(data, { status: response.status });
}

export async function POST({ fetch, locals }) {
  const response = await fetch("/api/v1/admin/ai/rebuild", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${locals.user?.token || ""}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return json(data, { status: response.status });
}
