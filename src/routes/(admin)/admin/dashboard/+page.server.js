/** @type {import('./$types').PageServerLoad} */
export async function load({url}) {

  return {
    seo: {
      title: 'Admin Dashboard',
      description: 'Admin Dashboard',
      pageType: 'website', //profile, website, article, video @see https://ogp.me/#types, https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/
      url: url.href,
      imgUrl: ""
    }
  }
}
