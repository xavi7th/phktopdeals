import { type } from 'arktype';

export const AppUserSchema = type({
  full_name: type("string>3").describe("provided"),
  email: type("string.email").describe("provided"),
  "phone?": "string|null",
  "avatar?": type("File|null|undefined").describe('provided').optional(),
  "avatar_url?": "string|null",
  is_active: "boolean",
  "is_admin?": "boolean",
  "is_verified?": "boolean",
});

export const AppUserDefaults = {
  full_name: '',
  email: '',
  phone: '',
  avatar: null,
  avatar_url: '',
  is_active: false,
  is_admin: false,
  is_verified: false,
};

export const TopUpAccountSchema = type({
  payment_method: "'btc'|'ltc'|'usdttrc20'|'bank payment'",
  amount: "number>0",
});

export const TopUpAccountDefaults = {
  payment_method: null,
  amount: 0,
};

export const PurchaseItemSchema = type({
  product_id: type("string>4").describe("valid"),
  email: type("string.email|undefined").describe("provided"),
  quantity: "number>=1",
  unit_price: "number>0",
  payment_method: "'crypto'|'bank payment'",
});

export const PurchaseItemDefaults = {
  product_id: null,
  email: undefined,
  quantity: 1,
  unit_price: 0,
  payment_method: null,
};

export const GiftCardSchema = type({
  product_name: type("string>1").describe("provided"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: type("File?").describe('provided').optional(),
  brand_id: type("string>1").describe("provided"),
  product_category: ["string[]>1", "@", "2 and above"],
  regions: ["string[]>1", "@", "selected"],
  product_min_price: "number>=0",
  percentage_discount: "0<=number<100",
  purchase_commission: type("0<number<100").describe("at least 0.5"),
  variable_denomination: "boolean?",
  'price_denominations?': "string[]",
  "discount_until?": "string|null|undefined",
  faqs: type("string").describe("provided"),
});

export const GiftCardDefaults = {
  product_name: '',
  product_type: 'gift card',
  brand_id: null,
  product_image: null,
  product_category: [''],
  regions: [''],
  price_denominations: [''],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined
};

export const eSimSchema = type({
  product_coverage: type("string>1").describe("not be empty"), //please create a coverage list to import here
  product_name: type("string>1").describe("not be empty"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: "File?",
  data_amount: type("string>1").describe("not be empty"),
  validity: "Date",
  cost: "number>0",
});

export const eSimDefaults = {
  product_coverage: '',
  product_name: '',
  product_type: '', //optional syntax
  product_image: null,
  data_amount: '',
  validity: null,
  cost: 0,
};

export const brandSchema = type({
  name: type("string>1").describe("not be empty"),
});

export const brandDefaults = {
  name: '',
};

export const gameSchema = type({
  product_name: type("string>1").describe("not be empty"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: "File?",
  product_category: ["string[]>1", "@", "2 and above"],
  product_price: "number>0",
  percentage_discount: "0<=number<100",
  purchase_commission: "0<number<100",
  variable_denomination: "boolean?",
  "discount_until?": "Date|null",
  faqs: type("string").describe("not be empty"),
});

export const gameDefaults = {
  product_name: '',
  product_type: '',
  product_image: null,
  product_category: [''], // games category is different it should be steam, apple or google
  product_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined
};

export const topUpSchema = type({
  product_name: type("string>1").describe("not be empty"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: "File?",
  product_category: ["string[]>1", "@", "2 and above"],
  product_min_price: "number>=0",
  percentage_discount: "0<=number<100",
  purchase_commission: "0<number<100",
  variable_denomination: "boolean?",
  'price_denominations?': "number[]", // how are we going to get the price discount select?
  "discount_until?": "Date|null",
  faqs: type("string").describe("not be empty"),
});

export const topUpDefaults = {
  product_name: '',
  product_type: '',
  product_image: null,
  product_category: [''],
  price_denominations: [0],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined
};
