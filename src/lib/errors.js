/**
 * Custom error class for API-related errors.
 * Used to distinguish API errors from other runtime errors.
 */
export class ApiError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} status - HTTP status code
   * @param {string} [code='API_ERROR'] - Machine-readable error code
   */
  constructor(message, status, code = "API_ERROR") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Predefined error for when the API is completely unavailable.
 * Use this when the API server is down or unreachable.
 */
export const API_UNAVAILABLE = new ApiError("Our service is temporarily unavailable. Please try again later.", 503, "API_UNAVAILABLE");

/**
 * Predefined error for network connectivity issues.
 */
export const NETWORK_ERROR = new ApiError("Unable to connect to our servers. Please check your internet connection.", 0, "NETWORK_ERROR");

/**
 * Check if an error is an ApiError
 * @param {unknown} error
 * @returns {error is ApiError}
 */
export function isApiError(error) {
  return error instanceof ApiError;
}
