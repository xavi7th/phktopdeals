/**
 * Transforms an error object into HTML string
 *
 * @param {String|Array|null} errors The errors to transform
 * @returns {String}
 */
export const getErrorString = errors => {

  if ( _.isString(errors) ) {
    var errs = errors;
  } else if ( _.size(errors) == 1 ) {
    var errs = _.reduce(errors, function ( val, n ) {
      return val.join("<br>") + "<br>" + n;
    });
  } else {
    var errs = _.reduce(errors, function ( val, n ) {
      return ( _.isString(val) ? val : val.join("<br>") ) + "<br>" + n;
    });
  }
  return errs
}

/**
 * @param {Number} amount The number to convert to currency
 * @param {String} currencySymbol The currency symbol to use. Default Naira
 * @returns {import('$lib/types').MediaHandler}
 */
export const toCurrency = ( amount, currencySymbol = '$' ) => {
  if ( isNaN(amount) ) {
    console.log(amount);
    return 'Invalid Amount';
  }
  return currencySymbol + Number(amount).toFixed(2)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

  var p = Number(amount)
    .toFixed(2)
    .split(".");
  return currency + p[0].split("")
    .reverse()
    .reduce(function ( acc, amount, i, orig ) {
      return amount == "-" ? acc : amount + ( i && !( i % 3 ) ? "," : "" ) + acc;
    }, "") + "." + p[1];
}

export const percentageCalculation = (amount = 0, commission = 0, discount = 0) => {
  let amount_to_pay;

  if(discount){
    const discount_percent = amount - ((amount*discount) / 100);
    amount_to_pay = discount_percent - ((discount_percent*commission) / 100);
  }else{
    amount_to_pay = amount + ((amount*commission) / 100);
  }
  return toCurrency(amount_to_pay);
}

/**
 *
 * @param {String} timeString the time string to convert to 12hr format eg 13:45
 * @returns {String}
 */
export const to12HrTime = timeString => new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString(
    'en-US',
    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
);

/**
 * Get an object sepcifying if the device is mobile or desktop using CSS media queries
 * @returns {Object}
 */
export const mediaHandler = () => {

  let isMobile, isDesktop;

  if ( window.matchMedia('(max-width: 991px)')
    .matches ) {
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

  return { isMobile, isDesktop }
}

/**
 * Converts a number into a file size. E.g 2000 to 2Kb
 * @param {Number} size
 * @returns {String}
 */
export function filesize( size ) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    ( size / Math.pow(1024, i) ).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

/**
 * Convert a string to s slug. Eg "A boy" to a-boy
 * @param {String} str The string to sligify
 * @returns {String}
 */
export const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Remove all white space and other characters from a string. Eg "A boy is A MAN"  to "aboyisaman"
 * @param {String} str
 * @returns {String}
 */
export const collapseCharacters = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '')
    .replace(/^-+|-+$/g, '');

/**
 * Get the parameters from an urlencoded string
 * @param {String} query
 * @returns {String}
 */
export const getParamsAsObject = function ( query ) {

  query = query.substring(query.indexOf('?') + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function ( str ) {
    return decodeURIComponent(str.replace(decodeRE, " "));
  };

  var params = {}, e;
  while ( e = re.exec(query) ) {
    var k = decode(e[1]), v = decode(e[2]);
    if ( k.substring(k.length - 2) === '[]' ) {
      k = k.substring(0, k.length - 2);
      ( params[k] || ( params[k] = [] ) ).push(v);
    } else params[k] = v;
  }

  var assign = function ( obj, keyPath, value ) {
    var lastKeyIndex = keyPath.length - 1;
    for ( var i = 0; i < lastKeyIndex; ++i ) {
      var key = keyPath[i];
      if ( !( key in obj ) )
        obj[key] = {}
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  }

  for ( var prop in params ) {
    var structure = prop.split('[');
    if ( structure.length > 1 ) {
      var levels = [];
      structure.forEach(function ( item, i ) {
        var key = item.replace(/[?[\]\\ ]/g, '');
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete(params[prop]);
    }
  }
  return params;
};

/**
 *
 * @param {Number|String} val
 * @returns {Boolean}
 */
export const isNumeric = val => {
  let num = "" + val; //coerce num to be a string
  return !isNaN(num) && !isNaN(parseFloat(num));
}

/**
 * Shuffle an array using Fisher-Yates shuffle
 * @param {Array} arr The array to shuffle.
 * @returns {Array}
 */
export const shuffle = arr => {
  for ( let i = arr.length - 1; i > 0; i-- ) {
    let j = Math.floor(Math.random() * ( i + 1 ));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns the first valid HTMLElement string that matches the supplied element type
 *
 * @param {String} str The html string
 * @param {String} elem The element to sreach for. Eg 'div'. Default 'p'
 * @returns {String}
 */
export const getFirstElement = (str, elem = 'p') => {
  let reg = new RegExp(`<${elem}(.*)>(.*?)<\\/${elem}>`, 'g');

  const match = str.match(reg);

  if (match) return match[0];

  return ''
}

import { env } from '$env/dynamic/public';

/**
 * Custom function to set API headers and make API calls
 *
 * @param {import('$lib/types').ApiParams} params
 *
 * @returns {Promise<Response> | undefined}
 */
export async function api({toBaseDomain, resource, event, method, data, logResponse}) {
	const base = env.PUBLIC_VITE_BASE_DOMAIN
	const baseApi = env.PUBLIC_VITE_BASE_API
	let fullurl = toBaseDomain ? base : baseApi

	if (resource) {
		fullurl += resource
	}

  if(logResponse){
    console.error('--------------- API Request: ' + method.toUpperCase() + ' ' + fullurl);
  }

	const response = await event?.fetch(fullurl, {
		method: method,
		headers: {
			'content-type': 'application/json',
			'accept': 'application/json',
			'cookie': event.request?.headers?.get('cookie') || '',
			'referer': event.request?.headers?.get('referer') || '',
      'x-xsrf-token': event.cookies.get('XSRF-TOKEN') || '',
		},
		body: data && JSON.stringify(data),
	});

  if(logResponse){
    console.error('--------------- API Response: ');
    let spyResponse = await response?.clone();
    console.error({status: spyResponse?.status, body: spyResponse?.status==204 ? null : await spyResponse?.json()}, '\n\n')
  }

	return response;
}
