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
 * Custom error message for Not Found server response
 *
 * @namespace ErrorNotFound
 * @class
 * @param {string | null} [message = null] - error details
 */
var ErrorNotFound =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ErrorNotFound, _Error);

  /**
   * Constructor generates error instance
   * @memberof ErrorNotFound
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorNotFound} - current instance
   */
  function ErrorNotFound() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, ErrorNotFound);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ErrorNotFound).call(this, message));
    _this.name = "Not Found";
    _this.statusCode = 404;
    _this.statusText = "Not Found";
    _this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), ErrorNotFound);
    } else {
      _this.stack = new Error().stack;
    }

    return _this;
  }

  return ErrorNotFound;
}((0, _wrapNativeSuper2["default"])(Error));

exports["default"] = ErrorNotFound;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9FcnJvck5vdEZvdW5kLmpzIl0sIm5hbWVzIjpbIkVycm9yTm90Rm91bmQiLCJtZXNzYWdlIiwibmFtZSIsInN0YXR1c0NvZGUiLCJzdGF0dXNUZXh0IiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQU9xQkEsYTs7Ozs7QUFDbkI7Ozs7Ozs7QUFPQSwyQkFBNEI7QUFBQTs7QUFBQSxRQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTtBQUFBO0FBQzFCLHlIQUFNQSxPQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLFdBQVo7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixXQUFsQjtBQUNBLFVBQUtILE9BQUwsR0FBZUEsT0FBZjs7QUFDQSxRQUFJSSxLQUFLLENBQUNDLGlCQUFWLEVBQTZCO0FBQzNCRCxNQUFBQSxLQUFLLENBQUNDLGlCQUFOLGlEQUE4Qk4sYUFBOUI7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFLTyxLQUFMLEdBQWEsSUFBSUYsS0FBSixHQUFZRSxLQUF6QjtBQUNEOztBQVZ5QjtBQVczQjs7O29DQW5Cd0NGLEsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEN1c3RvbSBlcnJvciBtZXNzYWdlIGZvciBOb3QgRm91bmQgc2VydmVyIHJlc3BvbnNlXG4gKlxuICogQG5hbWVzcGFjZSBFcnJvck5vdEZvdW5kXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW21lc3NhZ2UgPSBudWxsXSAtIGVycm9yIGRldGFpbHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JOb3RGb3VuZCBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGdlbmVyYXRlcyBlcnJvciBpbnN0YW5jZVxuICAgKiBAbWVtYmVyb2YgRXJyb3JOb3RGb3VuZFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbbWVzc2FnZSA9IG51bGxdIC0gZXJyb3IgZGV0YWlsc1xuICAgKiBAcmV0dXJuIHtFcnJvck5vdEZvdW5kfSAtIGN1cnJlbnQgaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBudWxsKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJOb3QgRm91bmRcIjtcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gXCJOb3QgRm91bmRcIjtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXJyb3JOb3RGb3VuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9XG4gIH1cbn1cbiJdfQ==