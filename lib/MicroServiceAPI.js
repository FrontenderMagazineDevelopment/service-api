"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _urlencode = _interopRequireDefault(require("urlencode"));

var _jsMd = _interopRequireDefault(require("js-md5"));

var _ErrorBadRequest = _interopRequireDefault(require("./ErrorBadRequest"));

var _ErrorCache = _interopRequireDefault(require("./ErrorCache"));

/**
 * TM Micro Service Proto API
 *
 * @namespace MicroServiceAPI
 * @class
 * @param {string} url - service url
 * @param {string | null} [token = null] - user access tocken if available
 */
var MicroServiceAPI =
/*#__PURE__*/
function () {
  /**
   * Constructor saves service url
   * @memberof MicroServiceAPI
   * @constructor
   * @param {string} url - service url
   * @param {string} [version = 'v1'] - service version
   * @param {string | null} [token = null] - user access tocken if available
   * @return {MicroServiceAPI} - current instance
   */
  function MicroServiceAPI(url) {
    var _this = this;

    var _token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    (0, _classCallCheck2["default"])(this, MicroServiceAPI);
    (0, _defineProperty2["default"])(this, "setToken", function (token) {
      _this.token = token;
    });
    (0, _defineProperty2["default"])(this, "setVersion", function (version) {
      _this.version = MicroServiceAPI.checkVersion(version);
    });

    /**
     * Service URL
     * @property {string} service url
     */
    this.url = url;
    /**
     * User access token
     * @property {string | null} [token = null] - user access tocken if available
     */

    this.token = _token;
    this.cache = process !== undefined && process.env !== undefined && process.env.TM_CACHE_CONFIG !== undefined;
    this.log = false;

    if (this.cache === true) {
      try {
        this.cacheConfig = typeof process.env.TM_CACHE_CONFIG === "string" ? JSON.parse(process.env.TM_CACHE_CONFIG) : process.env.TM_CACHE_CONFIG;
        this.log = this.cacheConfig.log;

        if (this.cacheConfig[this.url] === undefined || this.cacheConfig[this.url].enabled === false) {
          this.cache = false;
        }
      } catch (error) {} // eslint-disable-line

    }

    if (this.cache === true) {
      var Memcached = require('memcached'); // eslint-disable-line


      var uri = process.env.TM_CACHE_SERVER || "127.0.0.1:11211";
      this.memcached = new Memcached(uri, {
        timeout: this.cacheConfig.timeout
      });
    }
    /**
     * Service version
     * @property {string} [version = 'v1'] - service version
     */


    var tmpVersion = this.url.match(/\/v[\d]+(.[\d]+)?(.[\d]+)?/);
    this.version = tmpVersion === null ? "v1" : MicroServiceAPI.checkVersion(tmpVersion[0].slice(1));
    this.setToken = this.setToken.bind(this);
    this.request = this.request.bind(this);
  }
  /**
   * Object with class service messages
   * @type {Object}
   */


  (0, _createClass2["default"])(MicroServiceAPI, [{
    key: "serializeResponse",

    /**
     * We need to create simplified version of response ready for serialization
     *
     * @method serializeResponse
     * @memberof MicroServiceAPI
     * @private
     * @async
     *
     * @param  {Response}  response - response from fetch
     * @return {Promise}            - simplified response version for memcached
     */
    // eslint-disable-next-line
    value: function () {
      var _serializeResponse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(response) {
        var modified, text, json;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modified = {
                  ok: response.ok,
                  url: response.url,
                  type: response.type,
                  status: response.status,
                  statusText: response.statusText,
                  redirected: response.redirected,
                  headers: {
                    _headers: response.headers.raw()
                  },
                  json: null,
                  text: null
                };
                text = null;
                _context.prev = 2;
                _context.next = 5;
                return response.text();

              case 5:
                text = _context.sent;
                _context.next = 10;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);

              case 10:
                // eslint-disable-line
                json = null;

                try {
                  if (text !== null && text.trim().length > 0) {
                    json = JSON.parse(text);
                  }
                } catch (error) {} // eslint-disable-line


                return _context.abrupt("return", (0, _objectSpread2["default"])({}, modified, {
                  text: text,
                  json: json
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      function serializeResponse(_x) {
        return _serializeResponse.apply(this, arguments);
      }

      return serializeResponse;
    }()
    /**
     * Add methods to object
     *
     * @method parseResponse
     * @memberof MicroServiceAPI
     * @private
     * @static
     *
     * @param  {object} response parsed object from memcached
     * @return {object}          simplified copy of response
     */

  }, {
    key: "setToMemcached",

    /**
     * Add object to memcache
     *
     * @method setToMemcached
     * @memberof MicroServiceAPI
     * @private
     *
     * @param {string} key - mamcache key
     * @param {mixed} value - value
     * @param {number} ttl - second to store
     */
    value: function setToMemcached(key, value, ttl) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.memcached.set(key, value, ttl, function (error) {
          if (error) return reject(error);
          return resolve();
        });
      });
    }
    /**
     * Get data from memcache
     *
     * @method getFromMemcached
     * @memberof MicroServiceAPI
     * @private
     *
     * @param  {string} key - memcache key
     * @return {Promise} - promise which will resolve with data from memcache
     */

  }, {
    key: "getFromMemcached",
    value: function getFromMemcached(key) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.memcached.get(key, function (error, data) {
          if (error || data === undefined) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    }
    /**
     * Fetch remote resource
     *
     * @method request
     * @memberof MicroServiceAPI
     *
     * @static
     * @param {string} url - resource url
     * @param {Object} userOptions - user defined options
     * @return {Promise} - Promise with server {@link https://developer.mozilla.org/docs/Web/API/Response|Response}
     */

  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(url, userOptions) {
        var requestStart, requestEnd, updatedUrl, headers, defaultOptions, options, encodedData, uri, key, response, serialized;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(url === undefined)) {
                  _context2.next = 2;
                  break;
                }

                throw new _ErrorBadRequest["default"](400, MicroServiceAPI.messages.badRequest);

              case 2:
                if (this.log) requestStart = process.hrtime();
                updatedUrl = url.replace(/\/v[\d]+(.[\d]+)?(.[\d]+)?/i, "/".concat(this.version));
                headers = {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept-Encoding": "deflate, gzip;q=1.0, *;q=0.5"
                };

                if (this.token !== null) {
                  headers = (0, _objectSpread2["default"])({}, headers, {
                    Authorization: this.token
                  });
                }

                defaultOptions = {
                  method: "GET",
                  headers: headers,
                  data: {}
                };
                options = (0, _objectSpread2["default"])({}, defaultOptions, userOptions);
                options.headers = (0, _objectSpread2["default"])({}, headers, options.headers);
                encodedData = _urlencode["default"].stringify(options.data);
                uri = encodedData.length === 0 ? updatedUrl : "".concat(updatedUrl, "?").concat(encodedData);
                key = "".concat(uri, "---").concat((0, _jsMd["default"])(JSON.stringify(options)));

                if (!(this.cache === true)) {
                  _context2.next = 23;
                  break;
                }

                _context2.prev = 13;
                _context2.next = 16;
                return this.getFromMemcached(key);

              case 16:
                response = _context2.sent;

                if (!(response !== undefined)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", MicroServiceAPI.parseResponse(response));

              case 19:
                _context2.next = 23;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](13);

              case 23:
                _context2.next = 25;
                return (0, _isomorphicFetch["default"])(uri, options);

              case 25:
                response = _context2.sent;

                if (!(this.cache === true && response.ok === true)) {
                  _context2.next = 38;
                  break;
                }

                _context2.prev = 27;
                _context2.next = 30;
                return this.serializeResponse(response.clone());

              case 30:
                serialized = _context2.sent;
                _context2.next = 33;
                return this.setToMemcached(key, serialized, parseInt(this.cacheConfig[this.url].ttl, 10));

              case 33:
                _context2.next = 38;
                break;

              case 35:
                _context2.prev = 35;
                _context2.t1 = _context2["catch"](27);
                throw new _ErrorCache["default"](_context2.t1);

              case 38:
                if (this.log) {
                  requestEnd = process.hrtime();
                  requestStart = parseInt(requestStart[0] * 1e3 + requestStart[1] * 1e-6, 10);
                  requestEnd = parseInt(requestEnd[0] * 1e3 + requestEnd[1] * 1e-6, 10);
                  console.log("\n        \u0417\u0430\u043F\u0440\u043E\u0441: ".concat(options.method === undefined ? "GET" : options.method, " ").concat(uri, "\n        \u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445: ").concat(requestEnd - requestStart, " \u043C\u0441.\n      "));
                }

                return _context2.abrupt("return", response);

              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[13, 21], [27, 35]]);
      }));

      function request(_x2, _x3) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }], [{
    key: "checkVersion",

    /**
     * Validate service version
     * @method checkVersion
     * @memberof MicroServiceAPI
     *
     * @param  {string} version - service version
     * @throws {Error} - if URL do not match format Error will be thrown
     * @return {string} version - service version
     */
    value: function checkVersion(version) {
      if (!/^v[\d]+(.[\d]+)?(.[\d]+)?$/i.test(version)) throw new Error(MicroServiceAPI.messages.version);
      return version;
    }
  }, {
    key: "parseResponse",
    value: function parseResponse(response) {
      var headers = (0, _objectSpread2["default"])({}, response.headers);

      headers.get = function (name) {
        var header = headers._headers[name.toLowerCase()];

        return header ? header[0] : null;
      }; // eslint-disable-next-line


      headers.has = function (name) {
        return headers._headers.hasOwnProperty(name.toLowerCase());
      };

      headers.raw = function () {
        return headers._headers;
      };

      headers.getAll = function (name) {
        return headers.has(name) ? headers._headers[name.toLowerCase()] : [];
      };

      var json = function json() {
        return new Promise(function (resolve) {
          resolve(response.json);
        });
      };

      var text = function text() {
        return new Promise(function (resolve) {
          resolve(response.text);
        });
      };

      return (0, _objectSpread2["default"])({}, response, {
        json: json,
        text: text,
        headers: headers
      });
    }
  }]);
  return MicroServiceAPI;
}();

exports["default"] = MicroServiceAPI;
(0, _defineProperty2["default"])(MicroServiceAPI, "messages", {
  url: "Wrong Service URL Format",
  version: "Wrong Version Format",
  badRequest: "Bad Request"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9NaWNyb1NlcnZpY2VBUEkuanMiXSwibmFtZXMiOlsiTWljcm9TZXJ2aWNlQVBJIiwidXJsIiwidG9rZW4iLCJ2ZXJzaW9uIiwiY2hlY2tWZXJzaW9uIiwiY2FjaGUiLCJwcm9jZXNzIiwidW5kZWZpbmVkIiwiZW52IiwiVE1fQ0FDSEVfQ09ORklHIiwibG9nIiwiY2FjaGVDb25maWciLCJKU09OIiwicGFyc2UiLCJlbmFibGVkIiwiZXJyb3IiLCJNZW1jYWNoZWQiLCJyZXF1aXJlIiwidXJpIiwiVE1fQ0FDSEVfU0VSVkVSIiwibWVtY2FjaGVkIiwidGltZW91dCIsInRtcFZlcnNpb24iLCJtYXRjaCIsInNsaWNlIiwic2V0VG9rZW4iLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJtb2RpZmllZCIsIm9rIiwidHlwZSIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJyZWRpcmVjdGVkIiwiaGVhZGVycyIsIl9oZWFkZXJzIiwicmF3IiwianNvbiIsInRleHQiLCJ0cmltIiwibGVuZ3RoIiwia2V5IiwidmFsdWUiLCJ0dGwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldCIsImdldCIsImRhdGEiLCJ1c2VyT3B0aW9ucyIsIkVycm9yQmFkUmVxdWVzdCIsIm1lc3NhZ2VzIiwiYmFkUmVxdWVzdCIsInJlcXVlc3RTdGFydCIsImhydGltZSIsInVwZGF0ZWRVcmwiLCJyZXBsYWNlIiwiQXV0aG9yaXphdGlvbiIsImRlZmF1bHRPcHRpb25zIiwibWV0aG9kIiwib3B0aW9ucyIsImVuY29kZWREYXRhIiwidXJsZW5jb2RlIiwic3RyaW5naWZ5IiwiZ2V0RnJvbU1lbWNhY2hlZCIsInBhcnNlUmVzcG9uc2UiLCJzZXJpYWxpemVSZXNwb25zZSIsImNsb25lIiwic2VyaWFsaXplZCIsInNldFRvTWVtY2FjaGVkIiwicGFyc2VJbnQiLCJFcnJvckNhY2hlIiwicmVxdWVzdEVuZCIsImNvbnNvbGUiLCJ0ZXN0IiwiRXJyb3IiLCJuYW1lIiwiaGVh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QUpGO0FBTUQ7Ozs7OztpQ0F6TWtCbEMsZSxjQXdFRDtBQUNoQkMsRUFBQUEsR0FBRyxFQUFFLDBCQURXO0FBRWhCRSxFQUFBQSxPQUFPLEVBQUUsc0JBRk87QUFHaEJrRCxFQUFBQSxVQUFVLEVBQUU7QUFISSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoIGZyb20gXCJpc29tb3JwaGljLWZldGNoXCI7XG5pbXBvcnQgdXJsZW5jb2RlIGZyb20gXCJ1cmxlbmNvZGVcIjtcbmltcG9ydCBtZDUgZnJvbSBcImpzLW1kNVwiO1xuaW1wb3J0IEVycm9yQmFkUmVxdWVzdCBmcm9tIFwiLi9FcnJvckJhZFJlcXVlc3RcIjtcbmltcG9ydCBFcnJvckNhY2hlIGZyb20gXCIuL0Vycm9yQ2FjaGVcIjtcblxuLyoqXG4gKiBUTSBNaWNybyBTZXJ2aWNlIFByb3RvIEFQSVxuICpcbiAqIEBuYW1lc3BhY2UgTWljcm9TZXJ2aWNlQVBJXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBzZXJ2aWNlIHVybFxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdG9rZW4gPSBudWxsXSAtIHVzZXIgYWNjZXNzIHRvY2tlbiBpZiBhdmFpbGFibGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWljcm9TZXJ2aWNlQVBJIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIHNhdmVzIHNlcnZpY2UgdXJsXG4gICAqIEBtZW1iZXJvZiBNaWNyb1NlcnZpY2VBUElcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBzZXJ2aWNlIHVybFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3ZlcnNpb24gPSAndjEnXSAtIHNlcnZpY2UgdmVyc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFt0b2tlbiA9IG51bGxdIC0gdXNlciBhY2Nlc3MgdG9ja2VuIGlmIGF2YWlsYWJsZVxuICAgKiBAcmV0dXJuIHtNaWNyb1NlcnZpY2VBUEl9IC0gY3VycmVudCBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IodXJsLCB0b2tlbiA9IG51bGwpIHtcbiAgICAvKipcbiAgICAgKiBTZXJ2aWNlIFVSTFxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZXJ2aWNlIHVybFxuICAgICAqL1xuICAgIHRoaXMudXJsID0gdXJsO1xuXG4gICAgLyoqXG4gICAgICogVXNlciBhY2Nlc3MgdG9rZW5cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZyB8IG51bGx9IFt0b2tlbiA9IG51bGxdIC0gdXNlciBhY2Nlc3MgdG9ja2VuIGlmIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcblxuICAgIHRoaXMuY2FjaGUgPVxuICAgICAgcHJvY2VzcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcm9jZXNzLmVudiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwcm9jZXNzLmVudi5UTV9DQUNIRV9DT05GSUcgIT09IHVuZGVmaW5lZDtcblxuICAgIHRoaXMubG9nID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5jYWNoZSA9PT0gdHJ1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5jYWNoZUNvbmZpZyA9XG4gICAgICAgICAgdHlwZW9mIHByb2Nlc3MuZW52LlRNX0NBQ0hFX0NPTkZJRyA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgPyBKU09OLnBhcnNlKHByb2Nlc3MuZW52LlRNX0NBQ0hFX0NPTkZJRylcbiAgICAgICAgICAgIDogcHJvY2Vzcy5lbnYuVE1fQ0FDSEVfQ09ORklHO1xuICAgICAgICB0aGlzLmxvZyA9IHRoaXMuY2FjaGVDb25maWcubG9nO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5jYWNoZUNvbmZpZ1t0aGlzLnVybF0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHRoaXMuY2FjaGVDb25maWdbdGhpcy51cmxdLmVuYWJsZWQgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2FjaGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaChlcnJvcikge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNhY2hlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBNZW1jYWNoZWQgPSByZXF1aXJlKCdtZW1jYWNoZWQnLCApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb25zdCB1cmkgPSBwcm9jZXNzLmVudi5UTV9DQUNIRV9TRVJWRVIgfHwgXCIxMjcuMC4wLjE6MTEyMTFcIjtcbiAgICAgIHRoaXMubWVtY2FjaGVkID0gbmV3IE1lbWNhY2hlZCh1cmksIHtcbiAgICAgICAgdGltZW91dDogdGhpcy5jYWNoZUNvbmZpZy50aW1lb3V0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXJ2aWNlIHZlcnNpb25cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gW3ZlcnNpb24gPSAndjEnXSAtIHNlcnZpY2UgdmVyc2lvblxuICAgICAqL1xuICAgIGNvbnN0IHRtcFZlcnNpb24gPSB0aGlzLnVybC5tYXRjaCgvXFwvdltcXGRdKyguW1xcZF0rKT8oLltcXGRdKyk/Lyk7XG4gICAgdGhpcy52ZXJzaW9uID1cbiAgICAgIHRtcFZlcnNpb24gPT09IG51bGxcbiAgICAgICAgPyBcInYxXCJcbiAgICAgICAgOiBNaWNyb1NlcnZpY2VBUEkuY2hlY2tWZXJzaW9uKHRtcFZlcnNpb25bMF0uc2xpY2UoMSkpO1xuXG4gICAgdGhpcy5zZXRUb2tlbiA9IDo6dGhpcy5zZXRUb2tlbjtcbiAgICB0aGlzLnJlcXVlc3QgPSA6OnRoaXMucmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYmplY3Qgd2l0aCBjbGFzcyBzZXJ2aWNlIG1lc3NhZ2VzXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgbWVzc2FnZXMgPSB7XG4gICAgdXJsOiBcIldyb25nIFNlcnZpY2UgVVJMIEZvcm1hdFwiLFxuICAgIHZlcnNpb246IFwiV3JvbmcgVmVyc2lvbiBGb3JtYXRcIixcbiAgICBiYWRSZXF1ZXN0OiBcIkJhZCBSZXF1ZXN0XCJcbiAgfTtcblxuICAvKipcbiAgICogU2V0IGFjY2VzcyB0b2tlblxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZXRob2Qgc2V0VG9rZW5cbiAgICogQG1lbWJlcm9mIE1pY3JvU2VydmljZUFQSVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9rZW4gLSBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHNldFRva2VuID0gdG9rZW4gPT4ge1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHNlcnZpY2UgdmVyc2lvblxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBtZXRob2Qgc2V0VmVyc2lvblxuICAgKiBAbWVtYmVyb2YgTWljcm9TZXJ2aWNlQVBJXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJzaW9uIC0gc2VydmljZSB2ZXJzaW9uXG4gICAqL1xuICBzZXRWZXJzaW9uID0gdmVyc2lvbiA9PiB7XG4gICAgdGhpcy52ZXJzaW9uID0gTWljcm9TZXJ2aWNlQVBJLmNoZWNrVmVyc2lvbih2ZXJzaW9uKTtcbiAgfTtcblxuICAvKipcbiAgICogVmFsaWRhdGUgc2VydmljZSB2ZXJzaW9uXG4gICAqIEBtZXRob2QgY2hlY2tWZXJzaW9uXG4gICAqIEBtZW1iZXJvZiBNaWNyb1NlcnZpY2VBUElcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB2ZXJzaW9uIC0gc2VydmljZSB2ZXJzaW9uXG4gICAqIEB0aHJvd3Mge0Vycm9yfSAtIGlmIFVSTCBkbyBub3QgbWF0Y2ggZm9ybWF0IEVycm9yIHdpbGwgYmUgdGhyb3duXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdmVyc2lvbiAtIHNlcnZpY2UgdmVyc2lvblxuICAgKi9cbiAgc3RhdGljIGNoZWNrVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgaWYgKCEvXnZbXFxkXSsoLltcXGRdKyk/KC5bXFxkXSspPyQvaS50ZXN0KHZlcnNpb24pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE1pY3JvU2VydmljZUFQSS5tZXNzYWdlcy52ZXJzaW9uKTtcbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRvIGNyZWF0ZSBzaW1wbGlmaWVkIHZlcnNpb24gb2YgcmVzcG9uc2UgcmVhZHkgZm9yIHNlcmlhbGl6YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXJpYWxpemVSZXNwb25zZVxuICAgKiBAbWVtYmVyb2YgTWljcm9TZXJ2aWNlQVBJXG4gICAqIEBwcml2YXRlXG4gICAqIEBhc3luY1xuICAgKlxuICAgKiBAcGFyYW0gIHtSZXNwb25zZX0gIHJlc3BvbnNlIC0gcmVzcG9uc2UgZnJvbSBmZXRjaFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICAgICAgIC0gc2ltcGxpZmllZCByZXNwb25zZSB2ZXJzaW9uIGZvciBtZW1jYWNoZWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBhc3luYyBzZXJpYWxpemVSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGNvbnN0IG1vZGlmaWVkID0ge1xuICAgICAgb2s6IHJlc3BvbnNlLm9rLFxuICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgICB0eXBlOiByZXNwb25zZS50eXBlLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgcmVkaXJlY3RlZDogcmVzcG9uc2UucmVkaXJlY3RlZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgX2hlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMucmF3KClcbiAgICAgIH0sXG4gICAgICBqc29uOiBudWxsLFxuICAgICAgdGV4dDogbnVsbFxuICAgIH07XG5cbiAgICBsZXQgdGV4dCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCBqc29uID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgaWYgKHRleHQgIT09IG51bGwgJiYgdGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1vZGlmaWVkLFxuICAgICAgdGV4dCxcbiAgICAgIGpzb25cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBtZXRob2RzIHRvIG9iamVjdFxuICAgKlxuICAgKiBAbWV0aG9kIHBhcnNlUmVzcG9uc2VcbiAgICogQG1lbWJlcm9mIE1pY3JvU2VydmljZUFQSVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgcGFyc2VkIG9iamVjdCBmcm9tIG1lbWNhY2hlZFxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIHNpbXBsaWZpZWQgY29weSBvZiByZXNwb25zZVxuICAgKi9cbiAgc3RhdGljIHBhcnNlUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgLi4ucmVzcG9uc2UuaGVhZGVyc1xuICAgIH07XG4gICAgaGVhZGVycy5nZXQgPSBuYW1lID0+IHtcbiAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlcnMuX2hlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIHJldHVybiBoZWFkZXIgPyBoZWFkZXJbMF0gOiBudWxsO1xuICAgIH07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgaGVhZGVycy5oYXMgPSBuYW1lID0+IGhlYWRlcnMuX2hlYWRlcnMuaGFzT3duUHJvcGVydHkobmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBoZWFkZXJzLnJhdyA9ICgpID0+IGhlYWRlcnMuX2hlYWRlcnM7XG4gICAgaGVhZGVycy5nZXRBbGwgPSBuYW1lID0+XG4gICAgICBoZWFkZXJzLmhhcyhuYW1lKSA/IGhlYWRlcnMuX2hlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXSA6IFtdO1xuICAgIGNvbnN0IGpzb24gPSAoKSA9PlxuICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UuanNvbik7XG4gICAgICB9KTtcbiAgICBjb25zdCB0ZXh0ID0gKCkgPT5cbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnRleHQpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLFxuICAgICAganNvbixcbiAgICAgIHRleHQsXG4gICAgICBoZWFkZXJzXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb2JqZWN0IHRvIG1lbWNhY2hlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0VG9NZW1jYWNoZWRcbiAgICogQG1lbWJlcm9mIE1pY3JvU2VydmljZUFQSVxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gbWFtY2FjaGUga2V5XG4gICAqIEBwYXJhbSB7bWl4ZWR9IHZhbHVlIC0gdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHR0bCAtIHNlY29uZCB0byBzdG9yZVxuICAgKi9cbiAgc2V0VG9NZW1jYWNoZWQoa2V5LCB2YWx1ZSwgdHRsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubWVtY2FjaGVkLnNldChrZXksIHZhbHVlLCB0dGwsIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIGZyb20gbWVtY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRGcm9tTWVtY2FjaGVkXG4gICAqIEBtZW1iZXJvZiBNaWNyb1NlcnZpY2VBUElcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgLSBtZW1jYWNoZSBrZXlcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBwcm9taXNlIHdoaWNoIHdpbGwgcmVzb2x2ZSB3aXRoIGRhdGEgZnJvbSBtZW1jYWNoZVxuICAgKi9cbiAgZ2V0RnJvbU1lbWNhY2hlZChrZXkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5tZW1jYWNoZWQuZ2V0KGtleSwgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciB8fCBkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlbW90ZSByZXNvdXJjZVxuICAgKlxuICAgKiBAbWV0aG9kIHJlcXVlc3RcbiAgICogQG1lbWJlcm9mIE1pY3JvU2VydmljZUFQSVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSByZXNvdXJjZSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zIC0gdXNlciBkZWZpbmVkIG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBQcm9taXNlIHdpdGggc2VydmVyIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9BUEkvUmVzcG9uc2V8UmVzcG9uc2V9XG4gICAqL1xuICBhc3luYyByZXF1ZXN0KHVybCwgdXNlck9wdGlvbnMpIHtcbiAgICBpZiAodXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvckJhZFJlcXVlc3QoNDAwLCBNaWNyb1NlcnZpY2VBUEkubWVzc2FnZXMuYmFkUmVxdWVzdCk7XG4gICAgfVxuICAgIGxldCByZXF1ZXN0U3RhcnQ7XG4gICAgbGV0IHJlcXVlc3RFbmQ7XG4gICAgaWYgKHRoaXMubG9nKSByZXF1ZXN0U3RhcnQgPSBwcm9jZXNzLmhydGltZSgpO1xuXG4gICAgY29uc3QgdXBkYXRlZFVybCA9IHVybC5yZXBsYWNlKFxuICAgICAgL1xcL3ZbXFxkXSsoLltcXGRdKyk/KC5bXFxkXSspPy9pLFxuICAgICAgYC8ke3RoaXMudmVyc2lvbn1gXG4gICAgKTtcbiAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICBcIkFjY2VwdC1FbmNvZGluZ1wiOiBcImRlZmxhdGUsIGd6aXA7cT0xLjAsICo7cT0wLjVcIlxuICAgIH07XG4gICAgaWYgKHRoaXMudG9rZW4gIT09IG51bGwpIHtcbiAgICAgIGhlYWRlcnMgPSB7XG4gICAgICAgIC4uLmhlYWRlcnMsXG4gICAgICAgIEF1dGhvcml6YXRpb246IHRoaXMudG9rZW5cbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGRhdGE6IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi51c2VyT3B0aW9ucyB9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHsgLi4uaGVhZGVycywgLi4ub3B0aW9ucy5oZWFkZXJzIH07XG4gICAgY29uc3QgZW5jb2RlZERhdGEgPSB1cmxlbmNvZGUuc3RyaW5naWZ5KG9wdGlvbnMuZGF0YSk7XG4gICAgY29uc3QgdXJpID1cbiAgICAgIGVuY29kZWREYXRhLmxlbmd0aCA9PT0gMCA/IHVwZGF0ZWRVcmwgOiBgJHt1cGRhdGVkVXJsfT8ke2VuY29kZWREYXRhfWA7XG4gICAgY29uc3Qga2V5ID0gYCR7dXJpfS0tLSR7bWQ1KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKX1gO1xuXG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgaWYgKHRoaXMuY2FjaGUgPT09IHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRGcm9tTWVtY2FjaGVkKGtleSk7XG4gICAgICAgIGlmIChyZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIE1pY3JvU2VydmljZUFQSS5wYXJzZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmksIG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGUgPT09IHRydWUgJiYgcmVzcG9uc2Uub2sgPT09IHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSBhd2FpdCB0aGlzLnNlcmlhbGl6ZVJlc3BvbnNlKHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvTWVtY2FjaGVkKFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBzZXJpYWxpemVkLFxuICAgICAgICAgIHBhcnNlSW50KHRoaXMuY2FjaGVDb25maWdbdGhpcy51cmxdLnR0bCwgMTApXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3JDYWNoZShlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9nKSB7XG4gICAgICByZXF1ZXN0RW5kID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICAgIHJlcXVlc3RTdGFydCA9IHBhcnNlSW50KFxuICAgICAgICByZXF1ZXN0U3RhcnRbMF0gKiAxZTMgKyByZXF1ZXN0U3RhcnRbMV0gKiAxZS02LFxuICAgICAgICAxMFxuICAgICAgKTtcbiAgICAgIHJlcXVlc3RFbmQgPSBwYXJzZUludChyZXF1ZXN0RW5kWzBdICogMWUzICsgcmVxdWVzdEVuZFsxXSAqIDFlLTYsIDEwKTtcblxuICAgICAgY29uc29sZS5sb2coYFxuICAgICAgICDQl9Cw0L/RgNC+0YE6ICR7b3B0aW9ucy5tZXRob2QgPT09IHVuZGVmaW5lZCA/IFwiR0VUXCIgOiBvcHRpb25zLm1ldGhvZH0gJHt1cml9XG4gICAgICAgINCS0YDQtdC80Y8g0L/QvtC70YPRh9C10L3QuNGPINC00LDQvdC90YvRhTogJHtyZXF1ZXN0RW5kIC0gcmVxdWVzdFN0YXJ0fSDQvNGBLlxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG59XG4iXX0=