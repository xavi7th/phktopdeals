import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals, fetch }) {
    const token = locals.user?.token;
    if (!token) {
        error(401, 'Unauthorized');
    }

    const from = url.searchParams.get('from') || '';
    const to = url.searchParams.get('to') || '';
    const period = url.searchParams.get('period') || '7d';

    const params = new URLSearchParams({ period });
    if (from) params.set('from', from);
    if (to) params.set('to', to);

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/admin/ai/costs?${params}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { 'content-type': 'application/json' }
    });
}
