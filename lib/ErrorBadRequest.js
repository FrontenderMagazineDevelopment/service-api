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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9FcnJvckJhZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiRXJyb3JCYWRSZXF1ZXN0IiwibWVzc2FnZSIsIm5hbWUiLCJzdGF0dXNDb2RlIiwic3RhdHVzVGV4dCIsIkVycm9yIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJzdGFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7SUFPcUJBLGU7Ozs7O0FBQ25COzs7Ozs7O0FBT0EsNkJBQTRCO0FBQUE7O0FBQUEsUUFBaEJDLE9BQWdCLHVFQUFOLElBQU07QUFBQTtBQUMxQiwySEFBTUEsT0FBTjtBQUNBLFVBQUtDLElBQUwsR0FBWSxhQUFaO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixHQUFsQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsYUFBbEI7QUFDQSxVQUFLSCxPQUFMLEdBQWVBLE9BQWY7O0FBQ0EsUUFBSUksS0FBSyxDQUFDQyxpQkFBVixFQUE2QjtBQUMzQkQsTUFBQUEsS0FBSyxDQUFDQyxpQkFBTixpREFBOEJOLGVBQTlCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBS08sS0FBTCxHQUFhLElBQUlGLEtBQUosR0FBWUUsS0FBekI7QUFDRDs7QUFWeUI7QUFXM0I7OztvQ0FuQjBDRixLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDdXN0b20gZXJyb3IgbWVzc2FnZSBmb3IgQmFkIFJlcXVlc3Qgc2VydmVyIHJlc3BvbnNlXG4gKlxuICogQG5hbWVzcGFjZSBFcnJvckJhZFJlcXVlc3RcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbbWVzc2FnZSA9IG51bGxdIC0gZXJyb3IgZGV0YWlsc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvckJhZFJlcXVlc3QgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBnZW5lcmF0ZXMgZXJyb3JpbnN0YW5jZVxuICAgKiBAbWVtYmVyb2YgRXJyb3JCYWRSZXF1ZXN0XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFttZXNzYWdlID0gbnVsbF0gLSBlcnJvciBkZXRhaWxzXG4gICAqIEByZXR1cm4ge0Vycm9yQmFkUmVxdWVzdH0gLSBjdXJyZW50IGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gbnVsbCkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFkIFJlcXVlc3RcIjtcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gXCJCYWQgUmVxdWVzdFwiO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFcnJvckJhZFJlcXVlc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgfVxuICB9XG59XG4iXX0=