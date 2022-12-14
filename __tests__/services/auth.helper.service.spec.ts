import {
  generateJWTToken,
  verifyJWTToken,
} from "../../src/services/auth.helper.service";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("user.helper.service.ts", () => {
  describe("generateJWTToken", () => {
    it("should be defined", () => {
      expect(generateJWTToken).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof generateJWTToken).toBe("function");
    });
    it("should return a string", async () => {
      jwt.sign = jest.fn().mockImplementationOnce(() => "token");
      expect(await generateJWTToken("id")).toEqual("token");
    });
    it("should throw an error", async () => {
      jwt.sign = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(generateJWTToken("")).rejects.toThrow("Error");
    });
  });
  describe("verifyJWTToken", () => {
    it("should be defined", () => {
      expect(verifyJWTToken).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof verifyJWTToken).toBe("function");
    });
    it("should return a string", async () => {
      jwt.verify = jest.fn().mockImplementationOnce(() => "token");
      expect(await verifyJWTToken("token")).toEqual("token");
    });
    it("should throw an error", async () => {
      jwt.verify = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(verifyJWTToken("")).rejects.toThrow("Error");
    });
  });
});
