/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, params}) {
  console.log(params);

  const req = await fetch(`/api/products/${params.slug}`);
  const {prod_desc} = await req.json();

  return {
    prod_desc
  }
}
