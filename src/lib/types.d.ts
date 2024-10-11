import type { RequestEvent } from '@sveltejs/kit';

export interface ApiParams {
	method: string;
	event?: RequestEvent;
	resource?: string;
  /** Indicates whether to append the base url to the supplied resource url */
  toBaseDomain?: boolean;
  logResponse?: boolean;
	data?: Record<string, unknown> | null;
}
export type MediaHandler = {
  isDesktop: boolean,
  isMobile: boolean,
}
export type Service = {
  title: string,
  desc: string,
  cta: string,
  icon: string,
  url: string,
  isPopular: boolean,
}
export type NavData = {
  name: string,
  url: string
}
export type ProdSummary = {
  name: string,
  url: string,
  imgUrl: string,
  country: string,
  min_price: number,
}
export type ProductPriceTag = {
  /** Minumum manual amount purchaseable */
  min: number,
  /** an array of numbers specifying the available denominations to choose from */
  denominations?: Array<number>,
  /** determines whether they will be able to enter their own price. On create there will be a checkbox that determines if others will be added or not. */
  flexible: number,
  /** a percentage that determines how much markup will be to the total purchase as business profit */
  commission: number,
}
export type Product = {
  name: string
  product_type: string
  url: string,
  imgUrl: string,
  country: string,
  brand: string,
  categories: array<string>,
  /** All currencies will be set in dollars. We can implement a site-wide converter later OR we can have a field that specifies currencies (more difficult) */
  price_tags: ProductPriceTag,
  /** Percent off or false. If there is a discount display like this 9.5U will get you $10 (Assuming a 5% discount) */
  discount: number,
  /** Number of days left for discount to expire. */
  discount_until: number,
  faq: string,
}
export type AppUser = {
  name: string
  email: string,
  phone: string,
}
