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
 * Custom error message for cache fail
 *
 * @namespace ErrorCache
 * @class
 * @param {string | null} [message = null] - error details
 */
var ErrorCache =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ErrorCache, _Error);

  /**
   * Constructor generates error instance
   * @memberof ErrorCache
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorCache} - current instance
   */
  function ErrorCache() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, ErrorCache);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ErrorCache).call(this, message));
    _this.name = "Cache failed";
    _this.statusCode = 500;
    _this.statusText = "Cache failed";
    _this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), ErrorCache);
    } else {
      _this.stack = new Error().stack;
    }

    return _this;
  }

  return ErrorCache;
}((0, _wrapNativeSuper2["default"])(Error));

exports["default"] = ErrorCache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9FcnJvckNhY2hlLmpzIl0sIm5hbWVzIjpbIkVycm9yQ2FjaGUiLCJtZXNzYWdlIiwibmFtZSIsInN0YXR1c0NvZGUiLCJzdGF0dXNUZXh0IiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQU9xQkEsVTs7Ozs7QUFDbkI7Ozs7Ozs7QUFPQSx3QkFBNEI7QUFBQTs7QUFBQSxRQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTtBQUFBO0FBQzFCLHNIQUFNQSxPQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLGNBQVo7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixjQUFsQjtBQUNBLFVBQUtILE9BQUwsR0FBZUEsT0FBZjs7QUFDQSxRQUFJSSxLQUFLLENBQUNDLGlCQUFWLEVBQTZCO0FBQzNCRCxNQUFBQSxLQUFLLENBQUNDLGlCQUFOLGlEQUE4Qk4sVUFBOUI7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFLTyxLQUFMLEdBQWEsSUFBSUYsS0FBSixHQUFZRSxLQUF6QjtBQUNEOztBQVZ5QjtBQVczQjs7O29DQW5CcUNGLEsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEN1c3RvbSBlcnJvciBtZXNzYWdlIGZvciBjYWNoZSBmYWlsXG4gKlxuICogQG5hbWVzcGFjZSBFcnJvckNhY2hlXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW21lc3NhZ2UgPSBudWxsXSAtIGVycm9yIGRldGFpbHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JDYWNoZSBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGdlbmVyYXRlcyBlcnJvciBpbnN0YW5jZVxuICAgKiBAbWVtYmVyb2YgRXJyb3JDYWNoZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbbWVzc2FnZSA9IG51bGxdIC0gZXJyb3IgZGV0YWlsc1xuICAgKiBAcmV0dXJuIHtFcnJvckNhY2hlfSAtIGN1cnJlbnQgaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDYWNoZSBmYWlsZWRcIjtcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gXCJDYWNoZSBmYWlsZWRcIjtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXJyb3JDYWNoZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9XG4gIH1cbn1cbiJdfQ==