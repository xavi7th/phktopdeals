import { clsx } from "clsx";
import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import { twMerge } from "tailwind-merge";
import { PUBLIC_APP_COMMISSION_AMOUNT, PUBLIC_VITE_BASE_API, PUBLIC_VITE_BASE_DOMAIN, PUBLIC_VITE_FRONT_END_DOMAIN } from "$env/static/public";

/**
 * Transforms an error object into HTML string
 *
 * @param {string|string[]|null|import('sveltekit-superforms').ValidationErrors<Object<string, string>>} errors The errors to transform
 * @returns {String}
 */
export const getErrorString = (errors) => {
  let errs;
  if (typeof errors === "string") {
    errs = errors;
  } else if (errors && Object.keys(errors).length === 1) {
    errs = Object.values(errors)
      .flat()
      .filter(Boolean)
      .map((err) => `<li>${err}</li>`)
      .join("");
  } else {
    errs = Object.values(errors || {})
      .filter(Boolean)
      .reduce((val, n) => {
        return (
          (Array.isArray(val)
            ? val
                .filter(Boolean)
                .map((err) => `<li>${err}</li>`)
                .join("")
            : `<li>${val}</li>`) + `<li>${n}</li>`
        );
      }, "");
  }
  return errs.replaceAll("_", " ");
};

/**
 * @param {number | string} amount The number to convert to currency
 * @param {string} currencySymbol The currency symbol to use. Default Naira
 * @returns {string}
 */
export const toCurrency = (amount, currencySymbol = "$") => {
  if (isNaN(Number(amount))) {
    return "Invalid Amount";
  }

  if (currencySymbol == "NGN") {
    currencySymbol = "₦";
  }

  return (
    currencySymbol +
    Number(amount)
      .toFixed(2)
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  );
};

export const percentageCalculation = (unit_price = 0, quantity = 1, commission = 0, discount = 0, numeric = false, shouldTopUp = false) => {
  let amount_to_pay = Number(unit_price) * Number(quantity);

  if (commission <= 0) {
    amount_to_pay = (Number(unit_price) + (shouldTopUp ? Number(PUBLIC_APP_COMMISSION_AMOUNT) : 0)) * Number(quantity);
  } else {
    amount_to_pay = (Number(unit_price) + (shouldTopUp ? Number(commission) : 0)) * Number(quantity);
  }

  /**
   * @deprecated for now we will treat commissions as a flat amount and not a percentage
   */
  // if (discount) {
  //   const discount_percent = Number(amount_to_pay) - (amount_to_pay * discount) / 100;
  //   amount_to_pay = discount_percent - (discount_percent * commission) / 100;
  // } else {
  //   amount_to_pay = Number(amount_to_pay) + (amount_to_pay * commission) / 100;
  // }

  if (discount) {
    amount_to_pay = Number(amount_to_pay) - (amount_to_pay * discount) / 100;
  }

  return numeric ? amount_to_pay : toCurrency(amount_to_pay);
};

/**
 *
 * @param {String} timeString the time string to convert to 12hr format eg 13:45
 * @returns {String}
 */
export const to12HrTime = (timeString) => new Date("1970-01-01T" + timeString + "Z").toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" });

/**
 * Get an object specifying if the device is mobile or desktop using CSS media queries
 * @returns {Object}
 */
export const mediaHandler = () => {
  let isMobile, isDesktop;

  if (window.matchMedia("(max-width: 991px)").matches) {
    isMobile = true;
    isDesktop = false;
  } else {
    isMobile = false;
    isDesktop = true;
  }
  /**
   * To set up a watcher
   */
  // window.matchMedia('(min-width: 992px)')
  //  .addEventListener("change", () => {
  //      if (window.matchMedia('(max-width: 767px)')
  //          .matches) {
  //          isMobile = true;
  //          isDesktop = false;
  //      } else {
  //          isMobile = false;
  //          isDesktop = true;
  //      }
  //  })

  return { isMobile, isDesktop };
};

/**
 * Converts a number into a file size. E.g 2000 to 2Kb
 * @param {Number} size
 * @returns {String}
 */
export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

/**
 * Convert a string to s slug. Eg "A boy" to a-boy
 * @param {String} str The string to slugify
 * @returns {String}
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Remove all white space and other characters from a string. Eg "A boy is A MAN"  to "aboyisaman"
 * @param {String} str
 * @returns {String}
 */
export const collapseCharacters = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "")
    .replace(/^-+|-+$/g, "");

/**
 * Get the parameters from an urlencoded string
 * @param {String} query
 * @returns {String}
 */
export const getParamsAsObject = function (query) {
  query = query.substring(query.indexOf("?") + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function (str) {
    return decodeURIComponent(str.replace(decodeRE, " "));
  };

  var params = {},
    e;
  while ((e = re.exec(query))) {
    var k = decode(e[1]),
      v = decode(e[2]);
    if (k.substring(k.length - 2) === "[]") {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    } else params[k] = v;
  }

  var assign = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      var key = keyPath[i];
      if (!(key in obj)) obj[key] = {};
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  for (var prop in params) {
    var structure = prop.split("[");
    if (structure.length > 1) {
      var levels = [];
      structure.forEach(function (item, i) {
        var key = item.replace(/[?[\]\\ ]/g, "");
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete params[prop];
    }
  }
  return params;
};

/**
 * @param {any} val
 * @returns {boolean}
 */
export const isObject = (val) => {
  return typeof val === "object" && !Array.isArray(val) && val !== null;
};

/**
 * @param {any} val
 * @returns {boolean}
 */
export const isArrayable = (val) => {
  return typeof val === "object" && val !== null;
};

/**
 *
 * @param {Number|String} val
 * @returns {Boolean}
 */
export const isNumeric = (val) => {
  let num = "" + val; //coerce num to be a string
  return !isNaN(num) && !isNaN(parseFloat(num));
};

/**
 * Shuffle an array using Fisher-Yates shuffle
 * @param {Array} arr The array to shuffle.
 * @returns {Array}
 */
export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Returns the first valid HTMLElement string that matches the supplied element type
 *
 * @param {String} str The html string
 * @param {String} elem The element to search for. Eg 'div'. Default 'p'
 * @returns {String}
 */
export const getFirstElement = (str, elem = "p") => {
  let reg = new RegExp(`<${elem}(.*)>(.*?)<\\/${elem}>`, "g");

  const match = str.match(reg);

  if (match) return match[0];

  return "";
};

/**
 * Checks if a FormData object contains any File instances.
 * @param {FormData} formData - The FormData object to check.
 * @returns {boolean} - True if the FormData contains at least one File, false otherwise.
 */
export const hasFile = (formData) => {
  for (const value of formData.values()) {
    if (value instanceof File) {
      return true;
    }
  }
  return false;
};

/**
 * Custom function to set API headers and make API calls
 *
 * @param {import('$lib/types').ApiParams} params
 *
 * @returns {Promise<Response|undefined>}
 */
export async function api({ toBaseDomain, resource, event, method, data, logResponse = true, toJSON = true, ignoreErrors = false, extraHeaders = {} }) {
  const base = PUBLIC_VITE_BASE_DOMAIN;
  const baseApi = PUBLIC_VITE_BASE_API;
  let fullurl = toBaseDomain ? base : baseApi;

  /** @type {import('$lib/types').ApiHeaders} */
  let headers = {
    accept: "application/json",
    "accept-encoding": event.request?.headers?.get("accept-encoding") || "",
    "accept-language": event.request?.headers?.get("accept-language") || "",
    connection: event.request?.headers?.get("connection") || "",
    cookie: event.request?.headers?.get("cookie") || "",
    host: event.request?.headers?.get("host") || "",
    referer: event.request?.headers?.get("referer") || event.request?.url || "",
    origin: event.request?.headers?.get("origin") || PUBLIC_VITE_FRONT_END_DOMAIN,
    "x-xsrf-token": event.cookies?.get("XSRF-TOKEN") || "",
    "sec-ch-ua": event.cookies?.get("sec-ch-ua") || "",
    "sec-ch-ua-mobile": event.cookies?.get("sec-ch-ua-mobile") || "",
    "sec-ch-ua-platform": event.cookies?.get("sec-ch-ua-platform") || "",
    "user-agent": event.cookies?.get("user-agent") || "",
    "x-sveltekit-action": event.cookies?.get("x-sveltekit-action") || false,
    ...extraHeaders,
  };

  const isFormData = data instanceof FormData;
  const hasFiles = isFormData && hasFile(data);

  if (!hasFiles) {
    headers["content-type"] = "application/json";
    data = data ? JSON.stringify(isFormData ? Object.fromEntries(data) : data) : null;
  }

  if (resource) {
    fullurl += resource;
  }

  if (dev && logResponse) {
    console.error("--------------- API Request: " + method.toUpperCase() + " " + fullurl);
  }

  let response;
  try {
    response = await event?.fetch(fullurl, {
      method: method,
      headers,
      body: data || null,
    });
  } catch (error) {
    // API server is unreachable - return a mock error response instead of throwing
    // This allows the frontend to handle the error gracefully
    console.error("--------------- API Error: " + error.message);

    if (ignoreErrors) {
      return undefined;
    }

    // Return a mock response object that mimics a fetch Response
    return {
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({ error: "API server is unavailable", message: error.message }),
      text: async () => JSON.stringify({ error: "API server is unavailable", message: error.message }),
      url: fullurl,
    };
  }

  if (dev && logResponse) {
    console.error("--------------- API Response: ");

    const rsp = await response?.clone();

    /*if (rsp?.status === 500) {
      error(423, await rsp?.text());
    }*/

    console.error({ status: rsp?.status, body: [205, 204].includes(rsp?.status) ? null : await rsp?.text() }, "\n\n");
  }

  return response;
}

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 */
export const formToJSON = (elements) =>
  [].reduce.call(
    elements,
    (data, element) => {
      /**
       * Checks that an element has a non-empty `name` and `value` property.
       * @param  {Element} element  the element to check
       * @return {boolean} true if the element is an input, false if not
       */
      const isValidElement = (element) => element.name && element.value;

      /**
       * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
       * @param  {Element} element  the element to check
       * @return {boolean}    true if the value should be added, false if not
       */
      const isValidValue = (element) => !["checkbox", "radio"].includes(element.type) || element.checked;

      /**
       * Checks if an input is a checkbox, because checkboxes allow multiple values.
       * @param  {Element} element  the element to check
       * @return {boolean}          true if the element is a checkbox, false if not
       */
      const isCheckbox = (element) => element.type === "checkbox";

      /**
       * Checks if an input is a `select` with the `multiple` attribute.
       * @param  {Element} element  the element to check
       * @return {boolean}          true if the element is a multiselect, false if not
       */
      const isMultiSelect = (element) => element.options && element.multiple;

      /**
       * Retrieves the selected options from a multi-select as an array.
       * @param  {HTMLOptionsCollection} options  the options for the select
       * @return {array}                 an array of selected option values
       */
      const getSelectValues = (options) =>
        [].reduce.call(
          options,
          (values, option) => {
            return option.selected ? values.concat(option.value) : values;
          },
          [],
        );

      // Make sure the element has the required properties and should be added.
      if (isValidElement(element) && isValidValue(element)) {
        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element)) {
          data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
          data[element.name] = getSelectValues(element);
        } else {
          data[element.name] = element.value;
        }
      }

      return data;
    },
    {},
  );

/**
 *
 * @param {FormData} form The form data
 * @returns {pbject}
 */
export const formDataToObject = (form) => {
  return Object.fromEntries(Array.from(form.keys()).map((key) => [key, form.getAll(key).length > 1 ? form.getAll(key) : form.get(key)]));
};

/**
 * @param {object} data The Non-POJO object to convert
 * @returns {object}
 */
export const convertNonPOJOsToPOJOs = (data) => JSON.parse(JSON.stringify(data));

/**
 * @param  {import('clsx').ClassValue[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * This function debounces a function call for a specified amount of time
 *
 * @param {Function} func
 * @param {number} wait number of seconds to debounce for.
 * @returns {Function}
 */
export function debounce(func, wait) {
  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let timeout;
  return function (/** @type {any} */ ...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
