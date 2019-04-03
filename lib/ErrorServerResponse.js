"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

/**
 * Custom error message for abstract server response
 *
 * @namespace ErrorServerResponse
 * @class
 * @param {number} statusCode - http status code
 * @param {string} statusText - http status code text
 * @param {string | null} [message = null] - error details
 */
var ErrorServerResponse =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ErrorServerResponse, _Error);

  /**
   * Constructor generates error instance
   * @memberof ErrorServerResponse
   * @constructor
   * @param {number} statusCode - http status code
   * @param {string} statusText - http status code text
   * @param {string | null} [message = null] - error details
   * @return {ErrorServerResponse} - current instance
   */
  function ErrorServerResponse(statusCode, statusText) {
    var _this;

    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck2["default"])(this, ErrorServerResponse);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ErrorServerResponse).call(this, message));
    _this.name = "Server Response";
    _this.statusCode = statusCode;
    _this.statusText = statusText;
    _this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), ErrorServerResponse);
    } else {
      _this.stack = new Error().stack;
    }

    return _this;
  }

  return ErrorServerResponse;
}((0, _wrapNativeSuper2["default"])(Error));

exports["default"] = ErrorServerResponse;