"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _isomorphicFetch=_interopRequireDefault(require("isomorphic-fetch"));var _urlencode=_interopRequireDefault(require("urlencode"));var _jsMd=_interopRequireDefault(require("js-md5"));var _ErrorBadRequest=_interopRequireDefault(require("./ErrorBadRequest"));var _ErrorCache=_interopRequireDefault(require("./ErrorCache"));/**
 * TM Micro Service Proto API
 *
 * @namespace MicroServiceAPI
 * @class
 * @param {string} url - service url
 * @param {string | null} [token = null] - user access tocken if available
 */var MicroServiceAPI=/*#__PURE__*/function(){/**
   * Constructor saves service url
   * @memberof MicroServiceAPI
   * @constructor
   * @param {string} url - service url
   * @param {string} [version = 'v1'] - service version
   * @param {string | null} [token = null] - user access tocken if available
   * @return {MicroServiceAPI} - current instance
   */function MicroServiceAPI(url){var _this=this;var _token=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;(0,_classCallCheck2["default"])(this,MicroServiceAPI);(0,_defineProperty2["default"])(this,"setToken",function(token){_this.token=token});(0,_defineProperty2["default"])(this,"setVersion",function(version){_this.version=MicroServiceAPI.checkVersion(version)});/**
    * Service URL
    * @property {string} service url
    */this.url=url;/**
    * User access token
    * @property {string | null} [token = null] - user access tocken if available
    */this.token=_token;this.cache=process!==undefined&&process.env!==undefined&&process.env.TM_CACHE_CONFIG!==undefined;this.log=false;if(this.cache===true){try{this.cacheConfig=typeof process.env.TM_CACHE_CONFIG==="string"?JSON.parse(process.env.TM_CACHE_CONFIG):process.env.TM_CACHE_CONFIG;this.log=this.cacheConfig.log;if(this.cacheConfig[this.url]===undefined||this.cacheConfig[this.url].enabled===false){this.cache=false}}catch(error){}// eslint-disable-line
}if(this.cache===true){var Memcached=require("memcached");// eslint-disable-line
var uri=process.env.TM_CACHE_SERVER||"127.0.0.1:11211";this.memcached=new Memcached(uri,{timeout:this.cacheConfig.timeout})}/**
    * Service version
    * @property {string} [version = 'v1'] - service version
    */var tmpVersion=this.url.match(/\/v[\d]+(.[\d]+)?(.[\d]+)?/);this.version=tmpVersion===null?"v1":MicroServiceAPI.checkVersion(tmpVersion[0].slice(1));this.setToken=this.setToken.bind(this);this.request=this.request.bind(this)}/**
   * Object with class service messages
   * @type {Object}
   */(0,_createClass2["default"])(MicroServiceAPI,[{key:"serializeResponse",/**
   * We need to create simplified version of response ready for serialization
   *
   * @method serializeResponse
   * @memberof MicroServiceAPI
   * @private
   * @async
   *
   * @param  {Response}  response - response from fetch
   * @return {Promise}            - simplified response version for memcached
   */ // eslint-disable-next-line
value:function(){var _serializeResponse=(0,_asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(response){var modified,text,json;return _regenerator["default"].wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:modified={ok:response.ok,url:response.url,type:response.type,status:response.status,statusText:response.statusText,redirected:response.redirected,headers:{_headers:response.headers.raw()},json:null,text:null};text=null;_context.prev=2;_context.next=5;return response.text();case 5:text=_context.sent;_context.next=10;break;case 8:_context.prev=8;_context.t0=_context["catch"](2);case 10:// eslint-disable-line
json=null;try{if(text!==null&&text.trim().length>0){json=JSON.parse(text)}}catch(error){}// eslint-disable-line
return _context.abrupt("return",(0,_objectSpread2["default"])({},modified,{text:text,json:json}));case 13:case"end":return _context.stop();}}},_callee,null,[[2,8]])}));function serializeResponse(_x){return _serializeResponse.apply(this,arguments)}return serializeResponse}()/**
   * Add methods to object
   *
   * @method parseResponse
   * @memberof MicroServiceAPI
   * @private
   * @static
   *
   * @param  {object} response parsed object from memcached
   * @return {object}          simplified copy of response
   */},{key:"setToMemcached",/**
   * Add object to memcache
   *
   * @method setToMemcached
   * @memberof MicroServiceAPI
   * @private
   *
   * @param {string} key - mamcache key
   * @param {mixed} value - value
   * @param {number} ttl - second to store
   */value:function setToMemcached(key,value,ttl){var _this2=this;return new Promise(function(resolve,reject){_this2.memcached.set(key,value,ttl,function(error){if(error)return reject(error);return resolve()})})}/**
   * Get data from memcache
   *
   * @method getFromMemcached
   * @memberof MicroServiceAPI
   * @private
   *
   * @param  {string} key - memcache key
   * @return {Promise} - promise which will resolve with data from memcache
   */},{key:"getFromMemcached",value:function getFromMemcached(key){var _this3=this;return new Promise(function(resolve,reject){_this3.memcached.get(key,function(error,data){if(error||data===undefined){reject(error)}else{resolve(data)}})})}/**
  * Fetch remote resource
  *
  * @method request
  * @memberof MicroServiceAPI
  *
  * @static
  * @param {string} url - resource url
  * @param {Object} userOptions - user defined options
  * @return {Promise} - Promise with server {@link https://developer.mozilla.org/docs/Web/API/Response|Response}
  */},{key:"request",value:function(){var _request=(0,_asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(url,userOptions){var requestStart,requestEnd,updatedUrl,headers,defaultOptions,options,encodedData,uri,key,response,serialized;return _regenerator["default"].wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(!(url===undefined)){_context2.next=2;break}throw new _ErrorBadRequest["default"](400,MicroServiceAPI.messages.badRequest);case 2:if(this.log)requestStart=process.hrtime();updatedUrl=url.replace(/\/v[\d]+(.[\d]+)?(.[\d]+)?/i,"/".concat(this.version));headers={"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json; charset=utf-8","Accept-Encoding":"deflate, gzip;q=1.0, *;q=0.5"};if(this.token!==null){headers=(0,_objectSpread2["default"])({},headers,{Authorization:this.token})}defaultOptions={method:"GET",headers:headers,data:{}};options=(0,_objectSpread2["default"])({},defaultOptions,userOptions);options.headers=(0,_objectSpread2["default"])({},headers,options.headers);encodedData=_urlencode["default"].stringify(options.data);uri=encodedData.length===0?updatedUrl:"".concat(updatedUrl,"?").concat(encodedData);key="".concat(uri,"---").concat((0,_jsMd["default"])(JSON.stringify(options)));if(!(this.cache===true)){_context2.next=23;break}_context2.prev=13;_context2.next=16;return this.getFromMemcached(key);case 16:response=_context2.sent;if(!(response!==undefined)){_context2.next=19;break}return _context2.abrupt("return",MicroServiceAPI.parseResponse(response));case 19:_context2.next=23;break;case 21:_context2.prev=21;_context2.t0=_context2["catch"](13);case 23:_context2.next=25;return(0,_isomorphicFetch["default"])(uri,options);case 25:response=_context2.sent;if(!(this.cache===true&&response.ok===true)){_context2.next=38;break}_context2.prev=27;_context2.next=30;return this.serializeResponse(response.clone());case 30:serialized=_context2.sent;_context2.next=33;return this.setToMemcached(key,serialized,parseInt(this.cacheConfig[this.url].ttl,10));case 33:_context2.next=38;break;case 35:_context2.prev=35;_context2.t1=_context2["catch"](27);throw new _ErrorCache["default"](_context2.t1);case 38:if(this.log){requestEnd=process.hrtime();requestStart=parseInt(requestStart[0]*1e3+requestStart[1]*1e-6,10);requestEnd=parseInt(requestEnd[0]*1e3+requestEnd[1]*1e-6,10);console.log("\n        \u0417\u0430\u043F\u0440\u043E\u0441: ".concat(options.method===undefined?"GET":options.method," ").concat(uri,"\n        \u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445: ").concat(requestEnd-requestStart," \u043C\u0441.\n      "))}return _context2.abrupt("return",response);case 40:case"end":return _context2.stop();}}},_callee2,this,[[13,21],[27,35]])}));function request(_x2,_x3){return _request.apply(this,arguments)}return request}()}],[{key:"checkVersion",/**
  * Validate service version
  * @method checkVersion
  * @memberof MicroServiceAPI
  *
  * @param  {string} version - service version
  * @throws {Error} - if URL do not match format Error will be thrown
  * @return {string} version - service version
  */value:function checkVersion(version){if(!/^v[\d]+(.[\d]+)?(.[\d]+)?$/i.test(version))throw new Error(MicroServiceAPI.messages.version);return version}},{key:"parseResponse",value:function parseResponse(response){var headers=(0,_objectSpread2["default"])({},response.headers);headers.get=function(name){var header=headers._headers[name.toLowerCase()];return header?header[0]:null};// eslint-disable-next-line
headers.has=function(name){return headers._headers.hasOwnProperty(name.toLowerCase())};headers.raw=function(){return headers._headers};headers.getAll=function(name){return headers.has(name)?headers._headers[name.toLowerCase()]:[]};var json=function json(){return new Promise(function(resolve){resolve(response.json)})};var text=function text(){return new Promise(function(resolve){resolve(response.text)})};return(0,_objectSpread2["default"])({},response,{json:json,text:text,headers:headers})}}]);return MicroServiceAPI}();exports["default"]=MicroServiceAPI;(0,_defineProperty2["default"])(MicroServiceAPI,"messages",{url:"Wrong Service URL Format",version:"Wrong Version Format",badRequest:"Bad Request"});
//# sourceMappingURL=MicroServiceAPI.js.map