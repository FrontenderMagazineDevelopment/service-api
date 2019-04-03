"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("isomorphic-fetch");

var _ErrorNotFound = _interopRequireDefault(require("../ErrorNotFound"));

var code = 404;
var codeText = 'Not Found';
var message = 'Not found';
describe('Error Not  Found', function () {
  it('Error should be thrown', function () {
    expect(function () {
      throw new _ErrorNotFound["default"](message);
    }).toThrow();
  });
  it('Error should properly transfer code', function () {
    try {
      throw new _ErrorNotFound["default"](message);
    } catch (error) {
      expect(error.statusCode).toBe(code);
    }
  });
  it('Error should properly transfer code text', function () {
    try {
      throw new _ErrorNotFound["default"](message);
    } catch (error) {
      expect(error.statusText).toBe(codeText);
    }
  });
  it('Error should properly transfer message', function () {
    try {
      throw new _ErrorNotFound["default"](message);
    } catch (error) {
      expect(error.message).toBe(message);
    }
  });
  it('Error should set message as null if it omitter', function () {
    try {
      throw new _ErrorNotFound["default"]();
    } catch (error) {
      expect(error.message).toBe(null);
    }
  });
  it('Error should show proper stack trace', function () {
    try {
      throw new _ErrorNotFound["default"](message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });
  it('Error should show proper stack trace if captureStackTrace unavailable', function () {
    try {
      Error.captureStackTrace = undefined;
      throw new _ErrorNotFound["default"](message);
    } catch (error) {
      expect(error.stack).not.toBe(undefined);
    }
  });
});
//# sourceMappingURL=ErrorNotFound.js.map