import { getUsers } from "../../src/controllers/userController";
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
});
