import { createUser, getUsers } from "../../src/controllers/userController";
import { Request, Response } from "express";
import * as userService from "../../src/services/user.service";
import { BAD_REQUEST, MOCK_RETURN_VALUE_ARRAY, OK } from "../../src/const";

jest.mock("../../src/services/user.service");

const mockReqAndRes = () => ({
  mReq: { body: {} } as Request,
  mRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response,
});

describe("userController.ts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("getUsers", () => {
    it("Should be defined", () => {
      expect(getUsers).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getUsers).toBe("function");
    });
    it("should call findUsers once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(() => Promise.resolve([]));
      await getUsers(mReq, mRes);
      expect(userService.findUsers).toBeCalledTimes(1);
    });
    it("should return status 200 and json", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      await getUsers(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should return status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "findUsers")
        .mockImplementationOnce(() => Promise.reject("error"));
      await getUsers(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
  describe("createUser", () => {
    it("Should be defined", () => {
      expect(createUser).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof createUser).toBe("function");
    });
    it("should call createUser once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(() => Promise.resolve([]));
      await createUser(mReq, mRes);
      expect(userService.createUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(() => Promise.resolve("user"));
      await createUser(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await createUser(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
});
