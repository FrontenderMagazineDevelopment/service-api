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
 * Custom error message for Bad Request server response
 *
 * @namespace ErrorBadRequest
 * @class
 * @param {string | null} [message = null] - error details
 */
var ErrorBadRequest =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ErrorBadRequest, _Error);

  /**
   * Constructor generates errorinstance
   * @memberof ErrorBadRequest
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorBadRequest} - current instance
   */
  function ErrorBadRequest() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, ErrorBadRequest);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ErrorBadRequest).call(this, message));
    _this.name = "Bad Request";
    _this.statusCode = 400;
    _this.statusText = "Bad Request";
    _this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), ErrorBadRequest);
    } else {
      _this.stack = new Error().stack;
    }

    return _this;
  }

  return ErrorBadRequest;
}((0, _wrapNativeSuper2["default"])(Error));

exports["default"] = ErrorBadRequest;
//# sourceMappingURL=ErrorBadRequest.js.map