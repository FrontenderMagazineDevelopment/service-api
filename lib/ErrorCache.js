"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _wrapNativeSuper2=_interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));/**
 * Custom error message for cache fail
 *
 * @namespace ErrorCache
 * @class
 * @param {string | null} [message = null] - error details
 */var ErrorCache=/*#__PURE__*/function(_Error){(0,_inherits2["default"])(ErrorCache,_Error);/**
   * Constructor generates error instance
   * @memberof ErrorCache
   * @constructor
   * @param {string | null} [message = null] - error details
   * @return {ErrorCache} - current instance
   */function ErrorCache(){var _this;var message=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;(0,_classCallCheck2["default"])(this,ErrorCache);_this=(0,_possibleConstructorReturn2["default"])(this,(0,_getPrototypeOf2["default"])(ErrorCache).call(this,message));_this.name="Cache failed";_this.statusCode=500;_this.statusText="Cache failed";_this.message=message;if(Error.captureStackTrace){Error.captureStackTrace((0,_assertThisInitialized2["default"])(_this),ErrorCache)}else{_this.stack=new Error().stack}return _this}return ErrorCache}((0,_wrapNativeSuper2["default"])(Error));exports["default"]=ErrorCache;
//# sourceMappingURL=ErrorCache.js.map