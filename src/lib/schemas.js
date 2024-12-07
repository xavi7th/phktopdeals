import { type } from "arktype";

export const AppUserSchema = type({
  full_name: type("string>3").describe("provided"),
  email: type("string.email").describe("provided"),
  "phone?": "string|null",
  "avatar?": type("File|null|undefined").describe("provided").optional(),
  "avatar_url?": "string|null",
  is_active: "boolean",
  "is_admin?": "boolean",
  "is_verified?": "boolean",
});

export const AppUserDefaults = {
  full_name: "",
  email: "",
  phone: "",
  avatar: null,
  avatar_url: "",
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
  amount: 20,
};

export const VoucherCodeSchema = type({
  "id?": type("string>4 | undefined").describe("valid"),
  product_id: type("string>4").describe("valid"),
  "product_email_template_id?": type("string>4 | undefined").describe("valid"),
  amount: "number>0",
  code: type("string>=6").describe("at least 6 characters"),
  "app_user_id?": "string | undefined",
  "user_transaction_id?": "string | undefined",
  product_name: "string",
  product_image_url: "string",
  "email_template?": "string | undefined",
  "app_user_name?": "string | undefined",
  "app_user_email?": "string | undefined",
  is_sold: "boolean",
});

export const VoucherCodeDefaults = {
  id: undefined,
  product_id: "",
  amount: 0,
  code: "",
  product_email_template_id: undefined,
  app_user_id: undefined,
  user_transaction_id: undefined,
  product_name: "",
  product_image_url: "",
  email_template: undefined,
  app_user_name: undefined,
  app_user_email: undefined,
  is_sold: false,
};

export const PurchaseItemSchema = type({
  product_id: type("string>4").describe("valid"),
  email: type("string.email|undefined").describe("provided"),
  quantity: "number>=1",
  unit_price: "number>0",
  payment_method: "'crypto'|'bank payment'|null",
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
  product_image: type("File | null").describe("provided").optional(),
  brand_id: type("string>1").describe("provided"),
  product_category: ["string[]>1", "@", "2 and above"],
  regions: ["string[]>1", "@", "selected"],
  product_min_price: "number>=0",
  percentage_discount: "0<=number<100",
  purchase_commission: type("0<number<100").describe("at least 0.5"),
  variable_denomination: "boolean?",
  "price_denominations?": "string[]",
  "discount_until?": "string|null|undefined",
  faqs: type("string").describe("provided"),
});

export const GiftCardDefaults = {
  product_name: "",
  product_type: "gift card",
  brand_id: null,
  product_image: null,
  product_category: [""],
  regions: [""],
  price_denominations: [""],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined,
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
  product_coverage: "",
  product_name: "",
  product_type: "", //optional syntax
  product_image: null,
  data_amount: "",
  validity: null,
  cost: 0,
};

export const brandSchema = type({
  name: type("string>1").describe("not be empty"),
});

export const brandDefaults = {
  name: "",
};

export const brandEditSchema = type({
  uuid: type("string>1").describe("not be empty"),
  name: type("string>1").describe("not be empty"),
});

export const brandEditDefault = {
  uuid: "",
  name: "",
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
  product_name: "",
  product_type: "",
  product_image: null,
  product_category: [""], // games category is different it should be steam, apple or google
  product_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined,
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
  "price_denominations?": "number[]", // how are we going to get the price discount select?
  "discount_until?": "Date|null",
  faqs: type("string").describe("not be empty"),
});

export const topUpDefaults = {
  product_name: "",
  product_type: "",
  product_image: null,
  product_category: [""],
  price_denominations: [0],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 5,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined,
};
