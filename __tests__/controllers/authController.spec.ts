import { BAD_REQUEST, MOCK_OBJECT, OK, mockReqAndRes } from "../../src/const";
import { login, signup, protect } from "../../src/controllers/authController";
import * as authService from "../../src/services/auth.service";

jest.mock("../../src/services/auth.service");
jest.mock("../../src/services/auth.helper.service");

describe("userController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const { mReq, mRes, next } = mockReqAndRes();
  describe("signup", () => {
    it("Should be defined", () => {
      expect(signup).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof signup).toBe("function");
    });
    it("should call createUser once", async () => {
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes, next);
      expect(authService.signupUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should next if fails", async () => {
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await signup(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
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
      jest
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes, next);
      expect(authService.loginUser).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      jest
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await login(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(authService, "loginUser")
        .mockImplementationOnce(() => Promise.reject("error"));
      await login(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
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
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await protect(mReq, mRes, next);
      expect(authService.protectRoute).toBeCalledTimes(1);
    });
    it("should call next", async () => {
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await protect(mReq, mRes, next);
      expect(next).toBeCalledTimes(1);
    });
    it("should call if fails", async () => {
      jest
        .spyOn(authService, "protectRoute")
        .mockImplementationOnce(() => Promise.reject("error"));
      await protect(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
