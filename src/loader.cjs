/**
 * This file is needed on Namecheap servers in roder to properly load the sveltekit app
 *
 * We need this code and this file because shared hosting loaders throw a ERR_REQUIRE_ESM error when we try to use sveltekit's index.js directly as our entry point
 * So on Namecheap, this file serves as the entry point for our app.
 *
 * @see https://stackoverflow.com/questions/74174516/node-js-cpanel-error-im-getting-an-error-err-require-esm-must-use-import
 * @see https://www.digitalocean.com/community/tutorials/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab
 */

async function loadApp() {
  await import("./index.js");
}

loadApp();
