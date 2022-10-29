import {
  generateJWTToken,
  comparePassword,
} from "../../src/services/user.helper.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

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
  describe("comparePassword", () => {
    it("should be defined", () => {
      expect(comparePassword).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof comparePassword).toBe("function");
    });
    it("should return true", async () => {
      bcrypt.compare = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(true));
      expect(await comparePassword("password", "hashPassword")).toEqual(true);
    });
    it("should throw an error", async () => {
      bcrypt.compare = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(comparePassword("", "")).rejects.toThrow("Error");
    });
  });
});
