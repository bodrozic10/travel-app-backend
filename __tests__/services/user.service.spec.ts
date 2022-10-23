import {
  createUser,
  findUsers,
  generateJWTToken,
} from "../../src/services/user.service";
import { User } from "../../src/models/userModel";
import { IUser } from "../../src/interface/user";
import { MOCK_RETURN_VALUE_ARRAY, MOCK_OBJECT } from "../../src/const";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("userService", () => {
  describe("findUsers", () => {
    it("should be defined", () => {
      expect(findUsers).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof findUsers).toBe("function");
    });
    it("should return an array", async () => {
      User.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      expect(await findUsers()).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("should throw an error", async () => {
      User.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(findUsers()).rejects.toThrow("Error");
    });
  });
  describe("createUser", () => {
    it("should be defined", () => {
      expect(createUser).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof createUser).toBe("function");
    });
    it("should return an user", async () => {
      User.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_OBJECT));
      expect(await createUser({} as IUser)).toEqual(MOCK_OBJECT);
    });
    it("should throw an error", async () => {
      User.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(createUser({} as IUser)).rejects.toThrow("Error");
    });
  });
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
});
