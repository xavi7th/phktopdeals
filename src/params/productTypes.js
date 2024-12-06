/**
 * @param {string} param
 * @return {param is ('games' | 'eSims' | 'gift-cards' | 'top-up')}
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
 */
export function match(param) {
  return param === "games" || param === "eSims" || param === "gift-cards" || param === "top-up";
}
