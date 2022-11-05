import {
  findUsers,
  deleteUser,
  updateUser,
} from "../../src/services/user.service";
import { User } from "../../src/models/userModel";
import { MOCK_RETURN_VALUE_ARRAY } from "../../src/const";
import { IUser } from "../../src/interface/user";

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
  describe("deleteUser", () => {
    it("should be defined", () => {
      expect(deleteUser).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof deleteUser).toBe("function");
    });
    it("should throw an error", async () => {
      User.findByIdAndDelete = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(deleteUser("id")).rejects.toThrow("Error");
    });
  });
  describe("updateUser", () => {
    it("should be defined", () => {
      expect(updateUser).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof updateUser).toBe("function");
    });
    it("should return an object", async () => {
      User.findByIdAndUpdate = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({} as unknown as IUser));
      expect(await updateUser("id", {})).toEqual({});
    });
    it("should throw an error", async () => {
      User.findByIdAndUpdate = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(updateUser("id", {})).rejects.toThrow("Error");
    });
  });
});
