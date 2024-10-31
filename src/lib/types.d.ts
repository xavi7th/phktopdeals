import type { Cookies, RequestEvent } from '@sveltejs/kit';
import type { HTMLAttributes } from 'svelte/elements';

export type ApiParams = {
	method: string;
	event: RequestEvent;
	resource?: string;
  /** Indicates whether to append the base url to the supplied resource url */
  toBaseDomain?: boolean;
  toJSON?: boolean;
  logResponse?: boolean;
	data?: Record<string, unknown> | FormData | array | object | null;
}
export type ApiHeaders = {
  'accept': 'application/json' | 'plain/text';
  'accept-encoding': string;
  'content-type'?: 'application/json' | 'plain/text';
  'accept-language': string;
  'connection': string;
  'cookie': string;
  'host': string;
  'referer': string;
  'origin': string;
  'x-xsrf-token': string;
  'sec-ch-ua': string;
  'sec-ch-ua-mobile': string;
  'sec-ch-ua-platform': string;
  'user-agent': string;
  'x-sveltekit-action'?: boolean|string;
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
  id: string;
  url: string,
  product_name: string
  product_type: string
  product_type_slug: string
  product_image_url: string,
  product_category: array<string>,
  /** All currencies will be set in dollars. We can implement a site-wide converter later OR we can have a field that specifies currencies (more difficult) */
  product_price: ProductPriceTag,
  /** Percent off or false. If there is a discount display like this 9.5U will get you $10 (Assuming a 5% discount) */
  percentage_discount: number,
  /** Number of days left for discount to expire. */
  discount_until: Date,
  faq: string,
}
export type AppUser = {
  full_name: string;
  email: string;
  phone?: string;
  is_active: boolean;
  is_admin?: boolean;
}
export type AdminNavMenuItem = {
  name: string;
  uri: string;
  icon: string;
  iconAttributes?: HTMLAttributes;
}
