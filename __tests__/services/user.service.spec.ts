import { findUsers } from "../../src/services/user.service";
import { User } from "../../src/models/userModel";
import { MOCK_RETURN_VALUE_ARRAY } from "../../src/const";

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
});
