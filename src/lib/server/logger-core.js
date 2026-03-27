import fs from "node:fs";
import path from "node:path";
import util from "node:util";

/**
 * Extract caller information from stack trace.
 * Skips internal Node.js frames and logger-core frames.
 * @returns {{ function: string, file: string, line: string, column: string } | null}
 */
function getCallerInfo() {
  const stack = new Error().stack;
  if (!stack) return null;
  const stackLines = stack.split("\n");
  // Start at frame 5 (after Error, getCallerInfo, formatArgs, the logger fn, and the call site)
  for (let i = 5; i < stackLines.length; i++) {
    const line = stackLines[i];
    if (
      !line ||
      line.includes("node_modules") ||
      line.includes("internal/") ||
      line.includes("logger-core") ||
      line.includes("dev-logger") ||
      line.includes("loader.cjs")
    ) {
      continue;
    }
    // Match: at functionName (or anonymous) at file:line:column
    const match = line.match(/at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/);
    if (match) {
      const [, functionName, file, lineNum, column] = match;
      return { function: functionName || "anonymous", file, line: lineNum, column };
    }
  }
  return null;
}

/**
 * Format a single value for logging.
 * @param {any} arg
 * @returns {string}
 */
function formatArg(arg) {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.message;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

/**
 * Format multiple args into a single-line message.
 * @param {any[]} args
 * @returns {string}
 */
function formatArgs(args) {
  return args.map(formatArg).join(" ");
}

/**
 * Get the dated log filename for today.
 * @param {string} basePath - e.g. "/path/to/storage/logs/frontend-debug.log"
 * @returns {string} - e.g. "/path/to/storage/logs/frontend-debug-2026-03-27.log"
 */
function getDatedLogPath(basePath) {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const dir = path.dirname(basePath);
  const ext = path.extname(basePath);
  const base = path.basename(basePath, ext);
  return path.join(dir, `${base}-${date}${ext}`);
}

/**
 * Delete frontend-debug log files older than maxAgeDays.
 * @param {string} logDir - Directory containing the log files
 * @param {string} baseName - e.g. "frontend-debug.log"
 * @param {number} maxAgeDays - Files older than this are deleted
 */
function cleanupOldLogs(logDir, baseName, maxAgeDays = 90) {
  try {
    const files = fs.readdirSync(logDir);
    const base = baseName.replace(/\.log$/, "");
    const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;

    for (const file of files) {
      if (!file.startsWith(base) || !file.endsWith(".log")) continue;
      // Extract date from filename: frontend-debug-YYYY-MM-DD.log
      const match = file.match(/(\d{4}-\d{2}-\d{2})/);
      if (!match) continue;
      const fileDate = new Date(match[1]).getTime();
      if (isNaN(fileDate) || fileDate < cutoff) {
        const filePath = path.join(logDir, file);
        fs.unlinkSync(filePath);
      }
    }
  } catch {
    // Silently ignore cleanup errors - non-fatal
  }
}

/**
 * Format a log entry compatible with opcodesio/log-viewer (Laravel format).
 *
 * Format:
 * [timestamp] env.LEVEL: message in file:line
 * Stack trace:
 * #0 file(line): function()
 * ...
 * {"context_json"}
 *
 * @param {string} level - Log level e.g. 'ERROR', 'INFO'
 * @param {any[]} args - Log arguments
 * @param {object|null} context - User context object or null
 * @param {string|null} requestId - Request ID or null
 * @param {Error|null} error - Error instance if present
 * @returns {string}
 */
function formatLogEntry(level, args, context = null, requestId = null, error = null) {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const rawEnv = process.env.NODE_ENV || "production";
  const env = rawEnv === "development" ? "local" : rawEnv;

  let message = "";
  let stack = "";

  // Extract context from last arg if it's a plain object
  let logArgs = [...args];
  if (args.length > 1) {
    const lastArg = args[args.length - 1];
    if (
      typeof lastArg === "object" &&
      lastArg !== null &&
      !(lastArg instanceof Error) &&
      !Array.isArray(lastArg)
    ) {
      context = { ...context, ...lastArg };
      logArgs = logArgs.slice(0, -1);
    }
  }

  // Extract Error from args
  const foundError = error || logArgs.find((a) => a instanceof Error);
  const nonErrorArgs = logArgs.filter((a) => !(a instanceof Error));
  message = formatArgs(nonErrorArgs);

  // Prepend request ID
  if (requestId) {
    message = `(req:${requestId}) ${message}`;
  }

  const callerInfo = getCallerInfo();

  // Format error message and stack
  if (foundError) {
    if (!message || message === `(req:${requestId}) `) {
      message = (requestId ? `(req:${requestId}) ` : "") + foundError.message;
    } else {
      message += ` ${foundError.message}`;
    }
    if (foundError.stack) {
      const stackLines = foundError.stack.split("\n");
      const formattedStack = stackLines
        .slice(1) // Skip "Error:" line
        .map((line, i) => `#${i} ${line.trim().substring(3)}`)
        .join("\n");
      stack = `\nStack trace:\n${formattedStack}`;
    }
  }

  // Build full message with caller location
  let fullMessage = message;
  if (callerInfo) {
    fullMessage = `${message} in ${callerInfo.file}:${callerInfo.line}`;
  }

  // Build context JSON
  let contextString;
  if (context && Object.keys(context).length > 0) {
    contextString = JSON.stringify(context);
  } else {
    contextString = '{"user":null}';
  }

  return `[${timestamp}] ${env}.${level}: ${fullMessage}${stack} ${contextString}\n`;
}

/**
 * Create an AsyncLocalStorage instance for request context propagation.
 * @returns {AsyncLocalStorage}
 */
function createRequestContext() {
  return new AsyncLocalStorage();
}

/**
 * Create a logger with daily rotation and optional old-log cleanup.
 *
 * @param {string} baseLogPath - Base log path, e.g. "/path/to/logs/frontend-debug.log"
 * @param {{ getUserContext: function, getRequestId: function, cleanupDays?: number }} options
 * @returns {object} Logger instance
 */
function createLogger(baseLogPath, { getUserContext, getRequestId, cleanupDays = 90 }) {
  const logDir = path.dirname(baseLogPath);
  const baseName = path.basename(baseLogPath);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Cleanup old logs on startup
  cleanupOldLogs(logDir, baseName, cleanupDays);

  // Open stream for today's dated file
  let currentDate = new Date().toISOString().slice(0, 10);
  let stream = fs.createWriteStream(getDatedLogPath(baseLogPath), { flags: "a" });

  const levels = ["emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"];
  const stderrLevels = ["emergency", "alert", "critical", "error"];

  /**
   * Ensure we're writing to the correct dated file.
   * Called on every write.
   */
  function ensureDatedStream() {
    const today = new Date().toISOString().slice(0, 10);
    if (today !== currentDate) {
      currentDate = today;
      stream.end();
      stream = fs.createWriteStream(getDatedLogPath(baseLogPath), { flags: "a" });
    }
  }

  const logger = {};

  for (const level of levels) {
    logger[level] = (/** @type {any} */ message, /** @type {any} */ extra = null) => {
      ensureDatedStream();
      // If second arg is an Error, pass it explicitly for stack trace
      const isError = extra instanceof Error;
      const ctx = getUserContext();
      const reqId = getRequestId();
      const entry = isError
        ? formatLogEntry(level.toUpperCase(), [message], ctx, reqId, extra)
        : formatLogEntry(level.toUpperCase(), [message, extra].filter(Boolean), ctx, reqId, null);
      stream.write(entry);
      const output = stderrLevels.includes(level) ? process.stderr : process.stdout;
      output.write(`${level.toUpperCase()}: ${formatArgs([message])}\n`);
    };
  }

  /**
   * Log with an explicit Error object for proper stack trace capture.
   * @param {string} message
   * @param {Error} error
   * @param {object} [extraContext]
   */
  logger.logError = (message, error, extraContext = null) => {
    ensureDatedStream();
    const ctx = extraContext ? { ...getUserContext(), ...extraContext } : getUserContext();
    const reqId = getRequestId();
    const entry = formatLogEntry("ERROR", [message], ctx, reqId, error);
    stream.write(entry);
    process.stderr.write(`ERROR: ${message} — ${error.message}\n`);
  };

  /**
   * Override console.log and console.error to write to file + original streams.
   * console.warn and console.info also route through the same formatter.
   */
  logger.overrideConsole = () => {
    const originalStdoutWrite = process.stdout.write.bind(process.stdout);
    const originalStderrWrite = process.stderr.write.bind(process.stderr);

    // console.log -> INFO
    console.log = (/** @type {any[]} */ ...args) => {
      ensureDatedStream();
      const ctx = getUserContext();
      const reqId = getRequestId();
      const entry = formatLogEntry("INFO", args, ctx, reqId);
      stream.write(entry);
      originalStdoutWrite(util.format(...args) + "\n");
    };

    // console.error -> ERROR
    console.error = (/** @type {any[]} */ ...args) => {
      ensureDatedStream();
      const ctx = getUserContext();
      const reqId = getRequestId();
      const entry = formatLogEntry("ERROR", args, ctx, reqId);
      stream.write(entry);
      originalStderrWrite(util.format(...args) + "\n");
    };

    // console.warn -> WARNING
    console.warn = (/** @type {any[]} */ ...args) => {
      ensureDatedStream();
      const ctx = getUserContext();
      const reqId = getRequestId();
      const entry = formatLogEntry("WARNING", args, ctx, reqId);
      stream.write(entry);
      originalStdoutWrite(util.format(...args) + "\n");
    };

    // console.info -> INFO
    console.info = (/** @type {any[]} */ ...args) => {
      ensureDatedStream();
      const ctx = getUserContext();
      const reqId = getRequestId();
      const entry = formatLogEntry("INFO", args, ctx, reqId);
      stream.write(entry);
      originalStdoutWrite(util.format(...args) + "\n");
    };
  };

  return logger;
}

export { getCallerInfo, formatLogEntry, createRequestContext, createLogger, cleanupOldLogs };
