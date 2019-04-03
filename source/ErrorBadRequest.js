/**
 * Custom error message for Bad Request server response
 *
 * @namespace ErrorBadRequest
 * @class
 * @param {string | null} [message = null] - error details
 */
export default class ErrorBadRequest extends Error {
  /**
   * Constructor generates errorinstance
   * @memberof ErrorBadRequest
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorBadRequest} - current instance
   */
  constructor(message = null) {
    super(message);
    this.name = 'Bad Request';
    this.statusCode = 400;
    this.statusText = 'Bad Request';
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorBadRequest);
    } else {
      this.stack = new Error().stack;
    }
  }
}
