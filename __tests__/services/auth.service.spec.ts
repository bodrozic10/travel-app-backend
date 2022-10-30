import { MOCK_OBJECT, USER_CREDENTIALS } from "../../src/const";
import { IUser } from "../../src/interface/user";
import { User } from "../../src/models/userModel";
import { loginUser, signupUser } from "../../src/services/auth.service";
import * as authHelperService from "../../src/services/auth.helper.service";

jest.mock("../../src/services/auth.helper.service");

describe("authService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("createUser", () => {
    it("should be defined", () => {
      expect(signupUser).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof signupUser).toBe("function");
    });
    it("should return an user", async () => {
      User.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_OBJECT));
      expect(await signupUser({} as IUser)).toEqual(MOCK_OBJECT);
    });
    it("should throw an error", async () => {
      User.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(signupUser({} as IUser)).rejects.toThrow("Error");
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
    it("should throw an error if user is not found", async () => {
      User.findOne = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce(null),
      }));
      await expect(loginUser(USER_CREDENTIALS)).rejects.toThrow(
        new Error("Incorrect email or password")
      );
    });
    // it("should return token", async () => {
    //   User.findOne = jest.fn().mockImplementationOnce(() => ({
    //     select: jest.fn().mockResolvedValueOnce(MOCK_OBJECT),
    //   }));

    //   jest
    //     .spyOn(authHelperService, "generateJWTToken")
    //     .mockImplementationOnce(() => Promise.resolve("token"));

    //   expect(await loginUser(USER_CREDENTIALS)).toEqual("token");
    // });
  });
});