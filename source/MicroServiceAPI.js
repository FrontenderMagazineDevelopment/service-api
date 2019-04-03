import fetch from "isomorphic-fetch";
import urlencode from "urlencode";
import md5 from "js-md5";
import ErrorBadRequest from "./ErrorBadRequest";
import ErrorCache from "./ErrorCache";

/**
 * TM Micro Service Proto API
 *
 * @namespace MicroServiceAPI
 * @class
 * @param {string} url - service url
 * @param {string | null} [token = null] - user access tocken if available
 */
export default class MicroServiceAPI {
  /**
   * Constructor saves service url
   * @memberof MicroServiceAPI
   * @constructor
   * @param {string} url - service url
   * @param {string} [version = 'v1'] - service version
   * @param {string | null} [token = null] - user access tocken if available
   * @return {MicroServiceAPI} - current instance
   */
  constructor(url, token = null) {
    /**
     * Service URL
     * @property {string} service url
     */
    this.url = url;

    /**
     * User access token
     * @property {string | null} [token = null] - user access tocken if available
     */
    this.token = token;

    this.cache =
      process !== undefined &&
      process.env !== undefined &&
      process.env.TM_CACHE_CONFIG !== undefined;

    this.log = false;

    if (this.cache === true) {
      try {
        this.cacheConfig =
          typeof process.env.TM_CACHE_CONFIG === "string"
            ? JSON.parse(process.env.TM_CACHE_CONFIG)
            : process.env.TM_CACHE_CONFIG;
        this.log = this.cacheConfig.log;
        if (
          this.cacheConfig[this.url] === undefined ||
          this.cacheConfig[this.url].enabled === false
        ) {
          this.cache = false;
        }
      } catch(error) {} // eslint-disable-line
    }

    if (this.cache === true) {
      const Memcached = require('memcached', ); // eslint-disable-line
      const uri = process.env.TM_CACHE_SERVER || "127.0.0.1:11211";
      this.memcached = new Memcached(uri, {
        timeout: this.cacheConfig.timeout
      });
    }

    /**
     * Service version
     * @property {string} [version = 'v1'] - service version
     */
    const tmpVersion = this.url.match(/\/v[\d]+(.[\d]+)?(.[\d]+)?/);
    this.version =
      tmpVersion === null
        ? "v1"
        : MicroServiceAPI.checkVersion(tmpVersion[0].slice(1));

    this.setToken = ::this.setToken;
    this.request = ::this.request;
  }

  /**
   * Object with class service messages
   * @type {Object}
   */
  static messages = {
    url: "Wrong Service URL Format",
    version: "Wrong Version Format",
    badRequest: "Bad Request"
  };

  /**
   * Set access token
   *
   * @public
   * @method setToken
   * @memberof MicroServiceAPI
   * @param {string} token - access token
   */
  setToken = token => {
    this.token = token;
  };

  /**
   * Set service version
   *
   * @public
   * @method setVersion
   * @memberof MicroServiceAPI
   * @param {string} version - service version
   */
  setVersion = version => {
    this.version = MicroServiceAPI.checkVersion(version);
  };

  /**
   * Validate service version
   * @method checkVersion
   * @memberof MicroServiceAPI
   *
   * @param  {string} version - service version
   * @throws {Error} - if URL do not match format Error will be thrown
   * @return {string} version - service version
   */
  static checkVersion(version) {
    if (!/^v[\d]+(.[\d]+)?(.[\d]+)?$/i.test(version))
      throw new Error(MicroServiceAPI.messages.version);
    return version;
  }

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
  async serializeResponse(response) {
    const modified = {
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

    let text = null;
    try {
      text = await response.text();
    } catch (error) {} // eslint-disable-line

    let json = null;
    try {
      if (text !== null && text.trim().length > 0) {
        json = JSON.parse(text);
      }
    } catch (error) {} // eslint-disable-line

    return {
      ...modified,
      text,
      json
    };
  }

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
  static parseResponse(response) {
    const headers = {
      ...response.headers
    };
    headers.get = name => {
      const header = headers._headers[name.toLowerCase()];
      return header ? header[0] : null;
    };
    // eslint-disable-next-line
    headers.has = name => headers._headers.hasOwnProperty(name.toLowerCase());
    headers.raw = () => headers._headers;
    headers.getAll = name =>
      headers.has(name) ? headers._headers[name.toLowerCase()] : [];
    const json = () =>
      new Promise(resolve => {
        resolve(response.json);
      });
    const text = () =>
      new Promise(resolve => {
        resolve(response.text);
      });
    return {
      ...response,
      json,
      text,
      headers
    };
  }

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
  setToMemcached(key, value, ttl) {
    return new Promise((resolve, reject) => {
      this.memcached.set(key, value, ttl, error => {
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
  getFromMemcached(key) {
    return new Promise((resolve, reject) => {
      this.memcached.get(key, (error, data) => {
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
  async request(url, userOptions) {
    if (url === undefined) {
      throw new ErrorBadRequest(400, MicroServiceAPI.messages.badRequest);
    }
    let requestStart;
    let requestEnd;
    if (this.log) requestStart = process.hrtime();

    const updatedUrl = url.replace(
      /\/v[\d]+(.[\d]+)?(.[\d]+)?/i,
      `/${this.version}`
    );
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      "Accept-Encoding": "deflate, gzip;q=1.0, *;q=0.5"
    };
    if (this.token !== null) {
      headers = {
        ...headers,
        Authorization: this.token
      };
    }
    const defaultOptions = {
      method: "GET",
      headers,
      data: {}
    };

    const options = { ...defaultOptions, ...userOptions };
    options.headers = { ...headers, ...options.headers };
    const encodedData = urlencode.stringify(options.data);
    const uri =
      encodedData.length === 0 ? updatedUrl : `${updatedUrl}?${encodedData}`;
    const key = `${uri}---${md5(JSON.stringify(options))}`;

    let response;

    if (this.cache === true) {
      try {
        response = await this.getFromMemcached(key);
        if (response !== undefined) {
          return MicroServiceAPI.parseResponse(response);
        }
      } catch (error) {}  // eslint-disable-line
    }
    response = await fetch(uri, options);

    if (this.cache === true && response.ok === true) {
      try {
        const serialized = await this.serializeResponse(response.clone());
        await this.setToMemcached(
          key,
          serialized,
          parseInt(this.cacheConfig[this.url].ttl, 10)
        );
      } catch (error) {
        throw new ErrorCache(error);
      }
    }

    if (this.log) {
      requestEnd = process.hrtime();
      requestStart = parseInt(
        requestStart[0] * 1e3 + requestStart[1] * 1e-6,
        10
      );
      requestEnd = parseInt(requestEnd[0] * 1e3 + requestEnd[1] * 1e-6, 10);

      console.log(`
        Запрос: ${options.method === undefined ? "GET" : options.method} ${uri}
        Время получения данных: ${requestEnd - requestStart} мс.
      `);
    }

    return response;
  }
}
