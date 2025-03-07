import { type } from "arktype";
import { PUBLIC_VITE_FRONT_END_DOMAIN } from "$env/static/public";

export const AppUserSchema = type({
  full_name: type("string>3").describe("provided"),
  email: type("string.email").describe("provided"),
  "phone?": "string|null",
  "avatar?": type("File|null|undefined").describe("provided"),
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
  payment_method: "'btc'|'ltc'|'usdttrc20'|'bank payment'|'paystack'",
  amount: "number>0",
  "pay_amount?": "number|string",
  "description?": "string",
});

export const TopUpAccountDefaults = {
  payment_method: null,
  amount: 50,
  pay_amount: 0,
  description: "",
};

export const VoucherCodeSchema = type({
  "id?": type("string>4 | undefined").describe("valid"),
  product_id: type("string>4").describe("valid"),
  "product_email_template_id?": type("string>4 | undefined | null")
    .describe("valid")
    .pipe((v) => v || undefined),
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
  product_email_template_id: null,
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

export const productSchema = type({
  "id?": type("string"),
  product_name: type("string>1")
    .describe("provided")
    .pipe((v) => v ?? undefined),
  product_type: ["string>1", "@", "selected"], //optional syntax
  "product_image_url?": "string|null|undefined",
  product_image: type("File")
    .describe("provided")
    .configure({ problem: (ctx) => "You need to provide a " + ctx.propString }),
  brand_id: type("null | string>1").describe("provided"),
  product_category: type.string
    .array()
    .moreThanLength(0)
    .configure({ problem: (ctx) => "You need to provide at least one " + ctx.propString }),
  regions: type.string
    .array()
    .moreThanLength(0)
    .configure({ problem: (ctx) => "You need to provide at least one " + ctx.propString }),
  product_min_price: "number>=0",
  percentage_discount: "0<=number<100",
  "purchase_commission?": type("0<=number<100|undefined").configure({ problem: (ctx) => ctx.propString + " must be between 0% and 100%" }),
  variable_denomination: "boolean?",
  "price_denominations?": "string[]",
  "discount_until?": "string|null|undefined",
  faqs: type("string").describe("provided"),
});

export const productDefaults = {
  id: "",
  product_name: "",
  brand_id: null,
  product_image: null,
  product_category: [""],
  regions: [""],
  price_denominations: [""],
  product_min_price: 0,
  percentage_discount: 0,
  purchase_commission: 0,
  variable_denomination: false,
  discount_until: null,
  faqs: undefined,
  product_image_url: undefined,
};

export const giftCardDefaults = {
  ...productDefaults,
  product_type: "gift card",
};

export const eSimDefaults = {
  ...productDefaults,
  product_type: "esim",
};

export const topUpDefaults = {
  ...productDefaults,
  product_type: "top up",
};

export const gameDefaults = {
  ...productDefaults,
  product_type: "game",
};

export const sliderSchema = type({
  url: type("string.url|undefined|null").describe("a valid url"),
  image: type("File")
    .describe("provided")
    .configure({ problem: (ctx) => ctx.propString + " must be " + ctx.expected }),
  size: '"large"|"small"',
  "id?": type("string|undefined"),
});

export const sliderDefaults = {
  url: PUBLIC_VITE_FRONT_END_DOMAIN + "store/products",
  image: undefined,
  size: undefined,
  id: undefined,
};

export const brandSchema = type({
  "id?": type("string|undefined"),
  name: type("string>1").describe("not be empty"),
  "name_slug?": type("string"),
});

export const brandDefaults = {
  id: undefined,
  name: "",
  name_slug: "",
};
