import { signup, getUsers, login } from "../../src/controllers/userController";
import { Request, Response } from "express";
import * as userService from "../../src/services/user.service";
import {
  BAD_REQUEST,
  MOCK_OBJECT,
  MOCK_RETURN_VALUE_ARRAY,
  OK,
} from "../../src/const";

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
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_RETURN_VALUE_ARRAY) as Promise<any>
        );
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
  describe("signup", () => {
    it("Should be defined", () => {
      expect(signup).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof signup).toBe("function");
    });
    it("should call createUser and generateJWTToken once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes);
      expect(userService.createUser).toBeCalledTimes(1);
      expect(userService.generateJWTToken).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      jest
        .spyOn(userService, "createUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await signup(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
  describe("login", () => {
    it("Should be defined", () => {
      expect(login).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof login).toBe("function");
    });
    it("should call loginUser once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes);
      expect(userService.loginUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(userService, "loginUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await login(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
});
