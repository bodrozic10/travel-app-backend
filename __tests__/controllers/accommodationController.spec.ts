import {
  getAccommodations,
  createAccommodation,
} from "../../src/controllers/accommodationController";
import { Request, Response } from "express";
import * as accommodationService from "../../src/services/accommodation.service";
import {
  BAD_REQUEST,
  CREATED,
  SUCCESS,
  MOCK_RETURN_VALUE_ARRAY,
} from "../../src/const";

jest.mock("../../src/services/accommodation.service");

const mockReqAndRes = () => ({
  mReq: { body: {} } as Request,
  mRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response,
});

describe("accommodationController.ts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("getAccommodations", () => {
    it("Should be defined", () => {
      expect(getAccommodations).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getAccommodations).toBe("function");
    });
    it("should call findAccomodations once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      await getAccommodations(mReq, mRes);
      expect(accommodationService.findAccommodations).toBeCalledTimes(1);
    });
    it("should return status 200 and json", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      await getAccommodations(mReq, mRes);
      expect(mRes.json).toBeCalledWith({
        status: SUCCESS,
        length: MOCK_RETURN_VALUE_ARRAY.length,
        data: MOCK_RETURN_VALUE_ARRAY,
      });
    });
    it("should return status 400", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.reject("error"));
      await getAccommodations(mReq, mRes);
      expect(mRes.status).toBeCalledWith(BAD_REQUEST);
    });
  });
  describe("createAccommodation.ts", () => {
    it("Should be defined", () => {
      expect(createAccommodation).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof createAccommodation).toBe("function");
    });
    it("should call createAccommodation once", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(() => Promise.resolve({}));
      await createAccommodation(mReq, mRes);
      expect(accommodationService.createAccommodation).toBeCalledTimes(1);
    });
    it("should return status 201", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(() => Promise.resolve({}));
      await createAccommodation(mReq, mRes);
      expect(mRes.status).toHaveBeenCalledWith(CREATED);
    });
    it("should return status 404", async () => {
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await createAccommodation(mReq, mRes);
      expect(mRes.status).toHaveBeenCalledWith(BAD_REQUEST);
    });
  });
});
