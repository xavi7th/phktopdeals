/**
 * This hook fires on EVERY request made on the client side router.
 *
 * The request goes from here to the load functions and then back here and from here the response is sent back to the client
 *
 * So this is more like a controller in Laravel that is responsible for receiving the request, forwarding it to processors and then sending it back to the browsr
 */

import { dev } from "$app/environment";

/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleError = ({ event, error, message, status }) => {
  if (dev) {
    console.log("------------CLIENT ROUTING ERROR-----------");
    console.error({ event, error, message, status });
  }
  if (!event.url.pathname.includes("assets")) {
    return {
      message: message ?? "Oops",
      code: status ?? 500,
    };
  }
};
