import { MOCK_OBJECT, USER_CREDENTIALS } from "../../src/const";
import { IUser } from "../../src/interface/user";
import { User } from "../../src/models/userModel";
import {
  loginUser,
  signupUser,
  protectRoute,
} from "../../src/services/auth.service";
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
    it("should return token", async () => {
      User.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_OBJECT));
      jest
        .spyOn(authHelperService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      expect(await signupUser({} as IUser)).toEqual("token");
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
  });
  describe("protectRoute", () => {
    it("should be defined", () => {
      expect(protectRoute).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof protectRoute).toBe("function");
    });
    it("should throw an error if token is not provided", async () => {
      await expect(protectRoute(null)).rejects.toThrow(
        new Error("You are not logged in! Please log in to get access")
      );
    });
    it("should throw an error if user is not found", async () => {
      jest
        .spyOn(authHelperService, "verifyJWTToken")
        .mockImplementationOnce(() => Promise.resolve({ id: "id" }));
      User.findById = jest.fn().mockResolvedValueOnce(null);
      await expect(protectRoute("token")).rejects.toThrow(
        new Error("The user belonging to this token does no longer exist.")
      );
    });
  });
});
