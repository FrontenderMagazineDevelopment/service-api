"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("isomorphic-fetch");

var _nock = _interopRequireDefault(require("nock"));

var _MicroServiceAPI = _interopRequireDefault(require("../MicroServiceAPI"));

var serviceUrl = "//article.frontender.info/service/v3/";
var serviceUrlNoVersion = "//article.frontender.info/oauth/";
var token = "iddqdidclip";
describe("Micro Service API", function () {
  describe("Initialization: ", function () {
    it("It should not throw exception if URL is valid", function () {
      expect(function () {
        return new _MicroServiceAPI["default"](serviceUrl);
      }).not.toThrow();
    });
    it("It should get version from the url", function () {
      var service = new _MicroServiceAPI["default"](serviceUrl);
      expect(service.version).toBe("v3");
    });
    it("It should set version to v1 if there are none", function () {
      var service = new _MicroServiceAPI["default"](serviceUrlNoVersion);
      expect(service.version).toBe("v1");
    });
    it("It should throw exception if Version is invalid", function () {
      var service = new _MicroServiceAPI["default"](serviceUrl);

      try {
        service.setVersion("23423");
      } catch (error) {
        expect(error.message).toBe("Wrong Version Format");
      }
    });
    it("Version should change, if you set it with method", function () {
      var version = "v2";
      var service = new _MicroServiceAPI["default"](serviceUrl);
      service.setVersion(version);
      expect(service.version).toBe(version);
    });
    it("Token should be null, if not provided", function () {
      var service = new _MicroServiceAPI["default"](serviceUrl);
      expect(service.token).toBe(null);
    });
    it("Token should be stored, if provided", function () {
      var service = new _MicroServiceAPI["default"](serviceUrl, token);
      expect(service.token).toBe(token);
    });
    it("Token should change if you setup it with method", function () {
      var service = new _MicroServiceAPI["default"](serviceUrl);
      service.setToken(token);
      expect(service.token).toBe(token);
    });
  });
  describe("Request: ", function () {
    it("If you miss url argument Error should be thrown",
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return new _MicroServiceAPI["default"](serviceUrl);

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              expect(_context.t0.statusCode).toEqual(400);
              expect(_context.t0.statusText).toEqual("Bad Request");

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    })));
    it("If token is set header should be added",
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var service, response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _nock["default"])(/[.]+/).get("/service/v3/").reply(200);
              service = new _MicroServiceAPI["default"](serviceUrl, token);
              _context2.next = 4;
              return service.request("".concat(serviceUrl));

            case 4:
              response = _context2.sent;
              expect(response.ok).toEqual(true);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("If you set data, then it should be added to url",
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var service, response;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _nock["default"])(/[.]+/).get("/service/v3/").query({
                sortBy: "price"
              }).reply(200);
              service = new _MicroServiceAPI["default"](serviceUrl, token);
              _context3.next = 4;
              return service.request("".concat(serviceUrl), {
                data: {
                  sortBy: "price"
                }
              });

            case 4:
              response = _context3.sent;
              expect(response.ok).toEqual(true);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("If should return Promise",
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var service, response;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _nock["default"])(/[.]+/).get("/service/v3/").reply(200);
              service = new _MicroServiceAPI["default"](serviceUrl);
              response = service.request("".concat(serviceUrl));
              expect(Promise.resolve(response)).toEqual(response);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});
//# sourceMappingURL=TMMicroServiceAPI.js.map