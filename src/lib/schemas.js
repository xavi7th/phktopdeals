import { type } from 'arktype';

export const giftCardSchema = type({
  product_name: type("string>1").describe("not be empty"),
  product_type: ["string>1", "@", "selected"], //optional syntax
  product_image: "File?",
  product_category: ["string[]>1", "@", "2 and above"],
  product_min_price: "number>0",
  percentage_discount: "0<=number<100",
  purchase_commission: "0<number<100",
  variable_denomination: "boolean?",
  'price_denominations?': "number[]",
  "discount_until?": "Date|null",
  faqs: type("string").describe("not be empty"),
});

export const giftCardDefaults = {
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
