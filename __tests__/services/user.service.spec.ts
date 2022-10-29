import {
  createUser,
  findUsers,
  loginUser,
} from "../../src/services/user.service";
import * as userHelperService from "../../src/services/user.helper.service";
import { User } from "../../src/models/userModel";
import { IUser } from "../../src/interface/user";
import {
  MOCK_RETURN_VALUE_ARRAY,
  MOCK_OBJECT,
  USER_CREDENTIALS,
} from "../../src/const";

jest.mock("../../src/services/user.helper.service");

describe("userService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
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
  describe("loginUser", () => {
    it("should be defined", () => {
      expect(loginUser).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof loginUser).toBe("function");
    });
    it("should throw an error if credentials are not provided", async () => {
      await expect(loginUser({ email: "", password: "" })).rejects.toThrow(
        new Error("Please provide email and password")
      );
    });
    it("should throw an error if credentials are not provided", async () => {
      await expect(loginUser({ email: "", password: "" })).rejects.toThrow(
        new Error("Please provide email and password")
      );
    });
    it("should throw an error if user is not found", async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(null),
      }));
      await expect(loginUser(USER_CREDENTIALS)).rejects.toThrow(
        new Error("Incorrect email or password")
      );
    });
    it("should return token", async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(MOCK_OBJECT),
      }));
      jest
        .spyOn(userHelperService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      jest
        .spyOn(userHelperService, "comparePassword")
        .mockImplementationOnce(() => Promise.resolve(true));
      const response = await loginUser(USER_CREDENTIALS);
      expect(response).toEqual("token");
    });
  });
});
