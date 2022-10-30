import { BAD_REQUEST, MOCK_OBJECT, OK, mockReqAndRes } from "../../src/const";
import { login, signup } from "../../src/controllers/authController";
import * as authService from "../../src/services/auth.service";
import * as authHelperService from "../../src/services/auth.helper.service";

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
    it("should call createUser and generateJWTToken once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authHelperService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
      jest
        .spyOn(authService, "signupUser")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await signup(mReq, mRes);
      expect(authService.signupUser).toBeCalledTimes(1);
      expect(authHelperService.generateJWTToken).toBeCalledTimes(1);
    });
    it("should call with status 200", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(authHelperService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
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
        .spyOn(authHelperService, "generateJWTToken")
        .mockImplementationOnce(() => Promise.resolve("token"));
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
});
