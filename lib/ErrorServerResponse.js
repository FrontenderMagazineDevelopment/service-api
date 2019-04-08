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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9FcnJvclNlcnZlclJlc3BvbnNlLmpzIl0sIm5hbWVzIjpbIkVycm9yU2VydmVyUmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwic3RhdHVzVGV4dCIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0lBU3FCQSxtQjs7Ozs7QUFDbkI7Ozs7Ozs7OztBQVNBLCtCQUFZQyxVQUFaLEVBQXdCQyxVQUF4QixFQUFvRDtBQUFBOztBQUFBLFFBQWhCQyxPQUFnQix1RUFBTixJQUFNO0FBQUE7QUFDbEQsK0hBQU1BLE9BQU47QUFDQSxVQUFLQyxJQUFMLEdBQVksaUJBQVo7QUFDQSxVQUFLSCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsVUFBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUNBLFFBQUlFLEtBQUssQ0FBQ0MsaUJBQVYsRUFBNkI7QUFDM0JELE1BQUFBLEtBQUssQ0FBQ0MsaUJBQU4saURBQThCTixtQkFBOUI7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFLTyxLQUFMLEdBQWEsSUFBSUYsS0FBSixHQUFZRSxLQUF6QjtBQUNEOztBQVZpRDtBQVduRDs7O29DQXJCOENGLEsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEN1c3RvbSBlcnJvciBtZXNzYWdlIGZvciBhYnN0cmFjdCBzZXJ2ZXIgcmVzcG9uc2VcbiAqXG4gKiBAbmFtZXNwYWNlIEVycm9yU2VydmVyUmVzcG9uc2VcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c0NvZGUgLSBodHRwIHN0YXR1cyBjb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzVGV4dCAtIGh0dHAgc3RhdHVzIGNvZGUgdGV4dFxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbbWVzc2FnZSA9IG51bGxdIC0gZXJyb3IgZGV0YWlsc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvclNlcnZlclJlc3BvbnNlIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZ2VuZXJhdGVzIGVycm9yIGluc3RhbmNlXG4gICAqIEBtZW1iZXJvZiBFcnJvclNlcnZlclJlc3BvbnNlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzQ29kZSAtIGh0dHAgc3RhdHVzIGNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXR1c1RleHQgLSBodHRwIHN0YXR1cyBjb2RlIHRleHRcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbbWVzc2FnZSA9IG51bGxdIC0gZXJyb3IgZGV0YWlsc1xuICAgKiBAcmV0dXJuIHtFcnJvclNlcnZlclJlc3BvbnNlfSAtIGN1cnJlbnQgaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXR1c0NvZGUsIHN0YXR1c1RleHQsIG1lc3NhZ2UgPSBudWxsKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJTZXJ2ZXIgUmVzcG9uc2VcIjtcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEVycm9yU2VydmVyUmVzcG9uc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgfVxuICB9XG59XG4iXX0=