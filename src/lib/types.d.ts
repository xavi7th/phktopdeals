import type { HTMLAttributes } from "svelte/elements";
import type { Cookies, RequestEvent } from "@sveltejs/kit";

export type ApiParams = {
  method: string;
  event: RequestEvent;
  resource?: string;
  /** Indicates whether to append the base url to the supplied resource url */
  toBaseDomain?: boolean;
  toJSON?: boolean;
  logResponse?: boolean;
  data?: Record<string, unknown> | FormData | array | object | null;
};
export type ApiHeaders = {
  accept: "application/json" | "plain/text";
  "accept-encoding": string;
  "content-type"?: "application/json" | "plain/text";
  "accept-language": string;
  connection: string;
  cookie: string;
  host: string;
  referer: string;
  origin: string;
  "x-xsrf-token": string;
  "sec-ch-ua": string;
  "sec-ch-ua-mobile": string;
  "sec-ch-ua-platform": string;
  "user-agent": string;
  "x-sveltekit-action"?: boolean | string;
};
export type MediaHandler = {
  isDesktop: boolean;
  isMobile: boolean;
};
export type Service = {
  title: string;
  desc: string;
  cta: string;
  icon: string;
  url: string;
  isPopular: boolean;
  isMobileHidden: boolean;
};
export type PageSection = {
  top: Object<string, PageSectionContent>[];
  misc: Object<string, PageSectionContent>[];
};
export type PageSectionContent = {
  url: string;
  desc: string;
  items: ProdSummary[];
};
export type NavData = {
  name: string;
  url: string;
};
export type ProdSummary = {
  id: string;
  name: string;
  name_slug: string;
  img_url: string;
  regions: string;
  min_price: number;
  percentage_discount: number;
};
export type ProductPriceTag = {
  /** Minimum manual amount purchaseable */
  min: number;
  /** an array of numbers specifying the available denominations to choose from */
  denominations?: Array<number>;
  /** determines whether they will be able to enter their own price. On create there will be a checkbox that determines if others will be added or not. */
  flexible: number;
  /** a percentage that determines how much markup will be to the total purchase as business profit */
  commission: number;
};
export type ProductBrand = {
  id: string;
  name: string;
  name_slug: string;
};
export type Product = {
  id: string;
  url: string;
  brand_id: string;
  brand?: ProductBrand;
  regions: array<string>;
  product_name: string;
  product_type: string;
  product_type_slug: string;
  product_image_url: string;
  product_category: array<string>;
  /** All currencies will be set in dollars. We can implement a site-wide converter later OR we can have a field that specifies currencies (more difficult) */
  product_price: ProductPriceTag;
  /** Percent off or false. If there is a discount display like this 9.5U will get you $10 (Assuming a 5% discount) */
  percentage_discount: number;
  /** Number of days left for discount to expire. */
  discount_until: Date;
  faqs: string | undefined;
};
export type AppUser = {
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  is_admin?: boolean;
  is_verified?: boolean;
  wallet_balance?: number;
};
export type AdminNavMenuItem = {
  name: string;
  uri: string;
  description?: string;
  icon: string;
  iconAttributes?: HTMLAttributes;
  reload: boolean; //Should this menu item reload the page
};
export type ProductRegions = {
  country: string;
  code: string;
  phone_code: string;
};
export type PurchaseItem = {
  product_id: string;
  email: string;
  quantity: number;
  unit_price: number;
  payment_method: number;
};
export type NowCryptoCurrency = {
  ["btc" | "ltc" | "usdttrc20"]: {
    currency_from: string;
    currency_to: string;
    min_amount: number;
    fiat_equivalent: number;
  };
};
export type ExchangeRate = {
  provider: string;
  terms: URL;
  //The base currency we are converting from
  base: string;
  date: string;
  //Time stamp
  time_last_updated: number;
  //E.g "AED": 0.00243,
  rates: Record<string, number>;
};
export type UserOrder = {
  id: string;
  app_user_id: string;
  product_id: string;
  price_amount: string;
  pay_amount: number;
  pay_currency: string;
  description: string;
  payment_method: string;
  payment_reference: string;
  status: string;
  expired_at?: string | null;
  valid_until?: string | null;
  product_image_url: string;
  voucher_codes: { code: string; amount: number }[];
  is_confirmed: boolean;
  is_processed: boolean;
  is_processing?: boolean;
  app_user?: AppUser;
  product?: Product;
  payment_confirmed_at?: string;
  transaction_type: "'top up'|'purchase'";
};

export type Slider = {
  id: string;
  url: string;
  img_url: string;
  size: string;
};
