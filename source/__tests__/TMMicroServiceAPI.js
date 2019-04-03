import "isomorphic-fetch";
import nock from "nock";
import MicroServiceAPI from "../MicroServiceAPI";

const serviceUrl = "//article.frontender.info/service/v3/";
const serviceUrlNoVersion = "//article.frontender.info/oauth/";
const token = "iddqdidclip";

describe("Micro Service API", () => {
  describe("Initialization: ", () => {
    it("It should not throw exception if URL is valid", () => {
      expect(() => new MicroServiceAPI(serviceUrl)).not.toThrow();
    });

    it("It should get version from the url", () => {
      const service = new MicroServiceAPI(serviceUrl);
      expect(service.version).toBe("v3");
    });

    it("It should set version to v1 if there are none", () => {
      const service = new MicroServiceAPI(serviceUrlNoVersion);
      expect(service.version).toBe("v1");
    });

    it("It should throw exception if Version is invalid", () => {
      const service = new MicroServiceAPI(serviceUrl);
      try {
        service.setVersion("23423");
      } catch (error) {
        expect(error.message).toBe("Wrong Version Format");
      }
    });

    it("Version should change, if you set it with method", () => {
      const version = "v2";
      const service = new MicroServiceAPI(serviceUrl);
      service.setVersion(version);
      expect(service.version).toBe(version);
    });

    it("Token should be null, if not provided", () => {
      const service = new MicroServiceAPI(serviceUrl);
      expect(service.token).toBe(null);
    });

    it("Token should be stored, if provided", () => {
      const service = new MicroServiceAPI(serviceUrl, token);
      expect(service.token).toBe(token);
    });

    it("Token should change if you setup it with method", () => {
      const service = new MicroServiceAPI(serviceUrl);
      service.setToken(token);
      expect(service.token).toBe(token);
    });
  });

  describe("Request: ", () => {
    it("If you miss url argument Error should be thrown", async () => {
      try {
        await new MicroServiceAPI(serviceUrl);
      } catch (error) {
        expect(error.statusCode).toEqual(400);
        expect(error.statusText).toEqual("Bad Request");
      }
    });

    it("If token is set header should be added", async () => {
      nock(/[.]+/)
        .get("/service/v3/")
        .reply(200);
      const service = new MicroServiceAPI(serviceUrl, token);
      const response = await service.request(`${serviceUrl}`);
      expect(response.ok).toEqual(true);
    });

    it("If you set data, then it should be added to url", async () => {
      nock(/[.]+/)
        .get("/service/v3/")
        .query({ sortBy: "price" })
        .reply(200);
      const service = new MicroServiceAPI(serviceUrl, token);
      const response = await service.request(`${serviceUrl}`, {
        data: {
          sortBy: "price"
        }
      });
      expect(response.ok).toEqual(true);
    });

    it("If should return Promise", async () => {
      nock(/[.]+/)
        .get("/service/v3/")
        .reply(200);
      const service = new MicroServiceAPI(serviceUrl);
      const response = service.request(`${serviceUrl}`);
      expect(Promise.resolve(response)).toEqual(response);
    });
  });
});
