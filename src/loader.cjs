/**
 * Production entry point for the SvelteKit app on Namecheap shared hosting.
 *
 * This file is needed because shared hosting loaders throw a ERR_REQUIRE_ESM error
 * when trying to use SvelteKit's ESM entry point directly.
 *
 * This file is NOT used in development - only in production on Namecheap.
 *
 * Sets up:
 * 1. AsyncLocalStorage context for request-scoped user/request data
 * 2. Laravel-compatible file logger with daily rotation
 * 3. Console override so console.log/error go to file + stdout/stderr
 * 4. Uncaught exception and unhandled rejection handlers
 *
 * @see https://stackoverflow.com/questions/74174516/node-js-cpanel-error-im-getting-an-error-err-require-esm-must-use-import
 * @see https://www.digitalocean.com/community/tutorials/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab
 */

process.env.BODY_SIZE_LIMIT = "50M";

// --- START: ADVANCED LOGGER OVERRIDE ---
const fs = require("fs");
const path = require("path");

(async () => {
  const { createLogger, createRequestContext } = await import("./lib/server/logger-core.js");

  // Resolve path to Laravel storage logs
  // loader.cjs lives in src/, so ../../ reaches the phkhotdeals.com project root
  const logDir = path.join(__dirname, "../../api.phkhotdeals.com/storage/logs");

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Create AsyncLocalStorage for request context propagation
  // This makes request-scoped data (user, requestId) available anywhere
  // in the call stack without passing it explicitly through every function
  const requestContext = createRequestContext();
  global.__requestContext = requestContext;

  // Create logger with daily rotation and 90-day cleanup
  const logger = createLogger(path.join(logDir, "frontend-debug.log"), {
    getUserContext: () => {
      try {
        const store = requestContext.getStore();
        return store?.user || null;
      } catch {
        return null;
      }
    },
    getRequestId: () => {
      try {
        const store = requestContext.getStore();
        return store?.requestId || null;
      } catch {
        return null;
      }
    },
    cleanupDays: 90,
  });

  logger.overrideConsole();
  global.logger = logger;

  // --- END: ADVANCED LOGGER OVERRIDE ---

  /**
   * Handle Uncaught Exceptions.
   * Logged to file via the global logger, then process exits.
   */
  process.on("uncaughtException", (err) => {
    console.error(
      `CRITICAL: Uncaught Exception: ${err.message} in ${err.stack ? err.stack.split("\n")[1] : "unknown location"}:`,
      err
    );
    process.exit(1);
  });

  /**
   * Handle Unhandled Promise Rejections.
   * Logged to file via the global logger.
   */
  process.on("unhandledRejection", (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    console.error(
      `CRITICAL: Unhandled Promise Rejection: ${error.message}`,
      promise,
      "reason:",
      reason,
      { promise: "unhandled promise", reason: String(reason) }
    );
  });

  /**
   * Load the SvelteKit application.
   * The index.js is the adapter-node built entry point.
   */
  await import("./index.js");
})();
