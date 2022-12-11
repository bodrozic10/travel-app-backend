import {
  getUsers,
  removeUser,
  updateMe,
} from "../../src/controllers/userController";
import * as userService from "../../src/services/user.service";
import {
  BAD_REQUEST,
  MOCK_RETURN_VALUE_ARRAY,
  OK,
  mockReqAndRes,
} from "../../src/const";

jest.mock("../../src/services/user.service");

describe("userController.ts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const { mReq, mRes, next } = mockReqAndRes();
  describe("getUsers", () => {
    it("Should be defined", () => {
      expect(getUsers).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getUsers).toBe("function");
    });
    it("should call findUsers once", async () => {
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(() => Promise.resolve([]));
      await getUsers(mReq, mRes, next);
      expect(userService.findUsers).toBeCalledTimes(1);
    });
    it("should return status 200 and json", async () => {
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_RETURN_VALUE_ARRAY) as Promise<any>
        );
      await getUsers(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(() => Promise.reject("error"));
      await getUsers(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("removeUser", () => {
    it("Should be defined", () => {
      expect(removeUser).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof removeUser).toBe("function");
    });
    it("should call deleteUser once", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementationOnce(() => Promise.resolve());
      await removeUser(mReq, mRes, next);
      expect(userService.deleteUser).toBeCalledTimes(1);
    });
    it("should return status 200", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementationOnce(() => Promise.resolve());
      await removeUser(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await removeUser(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("updateMe", () => {
    it("Should be defined", () => {
      expect(updateMe).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof updateMe).toBe("function");
    });
    it("should call changeUserData once", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementationOnce(() => Promise.resolve({}) as Promise<any>);
      await updateMe(mReq, mRes, next);
      expect(userService.updateUser).toBeCalledTimes(1);
    });
    it("should return status 200", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementationOnce(() => Promise.resolve({}) as Promise<any>);
      await updateMe(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await updateMe(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
