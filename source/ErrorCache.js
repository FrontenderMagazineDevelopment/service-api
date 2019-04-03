/**
 * Custom error message for cache fail
 *
 * @namespace ErrorCache
 * @class
 * @param {string | null} [message = null] - error details
 */
export default class ErrorCache extends Error {
  /**
   * Constructor generates error instance
   * @memberof ErrorCache
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorCache} - current instance
   */
  constructor(message = null) {
    super(message);
    this.name = "Cache failed";
    this.statusCode = 500;
    this.statusText = "Cache failed";
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorCache);
    } else {
      this.stack = new Error().stack;
    }
  }
}
