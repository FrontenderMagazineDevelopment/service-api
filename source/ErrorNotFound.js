/**
 * Custom error message for Not Found server response
 *
 * @namespace ErrorNotFound
 * @class
 * @param {string | null} [message = null] - error details
 */
export default class ErrorNotFound extends Error {
  /**
   * Constructor generates error instance
   * @memberof ErrorNotFound
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorNotFound} - current instance
   */
  constructor(message = null) {
    super(message);
    this.name = "Not Found";
    this.statusCode = 404;
    this.statusText = "Not Found";
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorNotFound);
    } else {
      this.stack = new Error().stack;
    }
  }
}
