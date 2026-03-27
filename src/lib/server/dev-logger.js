import path from "node:path";
import { dev } from "$app/environment";
import { fileURLToPath } from "node:url";
import { getRequestEvent } from "$app/server";
import { createLogger } from "./logger-core.js";
import { PUBLIC_DEV_MACHINE } from "$env/static/public";

// @noCheck

/**
 * Server-only dev logger initialization.
 * This module uses Node.js APIs and must only be imported in hooks.server.js.
 *
 * Initialization guard: Only runs when BOTH:
 *   1. `dev` is true (SvelteKit dev mode)
 *   2. PUBLIC_DEV_MACHINE is true (env flag set by developer)
 *
 * This prevents the logger from ever running in production.
 * @type {object | null}
 */
let logger = null;

/**
 * Initialize the dev logger. Returns the logger instance or null.
 * @returns {object|null}
 */
export function initDevLogger() {
  if (!dev || !PUBLIC_DEV_MACHINE || logger) {
    return logger;
  }

  const __filename = fileURLToPath(import.meta.url);
  const logDir = path.join(path.dirname(__filename), "../../../../api.phkhotdeals.com/storage/logs");
  const baseLogPath = logDir + "/frontend-debug.log";

  const devLogger = createLogger(baseLogPath, {
    getUserContext: () => {
      try {
        const event = getRequestEvent();
        // User data lives in event.locals.session.data.user
        return event.locals?.session?.data?.user || null;
      } catch {
        return null;
      }
    },
    getRequestId: () => {
      try {
        const event = getRequestEvent();
        return event.locals?.requestId || null;
      } catch {
        return null;
      }
    },
    cleanupDays: 90,
  });

  devLogger.overrideConsole();
  logger = devLogger;
  return logger;
}

/**
 * Unified logger accessor for use by other server-side modules.
 * Dev: returns the module-level logger (set by initDevLogger)
 * Production: returns globalThis.logger (set by loader.cjs)
 * @returns {object|null}
 */
export function getLogger() {
  // Dev: logger is set by initDevLogger()
  if (dev && PUBLIC_DEV_MACHINE && logger) {
    return logger;
  }
  // Production: logger is set as globalThis.logger by loader.cjs
  if (globalThis.logger) {
    return globalThis.logger;
  }
  return null;
}

/**
 * Log a message with file:line location and automatic request context.
 * Works in both dev and production.
 *
 * When passed an Error as the second argument, uses logError() for proper
 * stack trace extraction and stores the result in the JSON context tail.
 *
 * @param {string} message - The log message
 * @param {object|Error} [contextOrError] - Context object OR Error instance
 */
export function logWithLocation(message, contextOrError = null) {
  const log = getLogger();
  if (!log) return;

  if (contextOrError instanceof Error) {
    log.logError(message, contextOrError);
  } else {
    log.notice(message, contextOrError);
  }
}

export { logger };
