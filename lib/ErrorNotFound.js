"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _wrapNativeSuper2=_interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));/**
 * Custom error message for Not Found server response
 *
 * @namespace ErrorNotFound
 * @class
 * @param {string | null} [message = null] - error details
 */var ErrorNotFound=/*#__PURE__*/function(_Error){(0,_inherits2["default"])(ErrorNotFound,_Error);/**
   * Constructor generates error instance
   * @memberof ErrorNotFound
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorNotFound} - current instance
   */function ErrorNotFound(){var _this;var message=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;(0,_classCallCheck2["default"])(this,ErrorNotFound);_this=(0,_possibleConstructorReturn2["default"])(this,(0,_getPrototypeOf2["default"])(ErrorNotFound).call(this,message));_this.name="Not Found";_this.statusCode=404;_this.statusText="Not Found";_this.message=message;if(Error.captureStackTrace){Error.captureStackTrace((0,_assertThisInitialized2["default"])(_this),ErrorNotFound)}else{_this.stack=new Error().stack}return _this}return ErrorNotFound}((0,_wrapNativeSuper2["default"])(Error));exports["default"]=ErrorNotFound;
//# sourceMappingURL=ErrorNotFound.js.map