import { BAD_REQUEST, MOCK_OBJECT, OK, mockReqAndRes } from "../../src/const";
import { login, signup, protect } from "../../src/controllers/authController";
import * as authService from "../../src/services/auth.service";

jest.mock("../../src/services/auth.service");
jest.mock("../../src/services/auth.helper.service");

describe("userController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("signup", () => {
    it("Should be defined", () => {
      expect(signup).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof signup).toBe("function");
    });
    it("should call createUser once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes);
      expect(authService.signupUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authService, "signupUser")
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
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes);
      expect(authService.loginUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await login(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
  describe("protect", () => {
    it("Should be defined", () => {
      expect(protect).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof protect).toBe("function");
    });
    it("should call protect once", async () => {
      const { mReq, mRes, next } = mockReqAndRes();
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await protect(mReq, mRes, next);
      expect(authService.protectRoute).toBeCalledTimes(1);
    });
    it("should call next", async () => {
      const { mReq, mRes, next } = mockReqAndRes();
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await protect(mReq, mRes, next);
      expect(next).toBeCalledTimes(1);
    });
    it("should call with status 404", async () => {
      const { mReq, mRes, next } = mockReqAndRes();
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(() => Promise.reject("error"));
      await protect(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
});
