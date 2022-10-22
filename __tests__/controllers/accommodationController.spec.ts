import {
  getAccommodations,
  createAccommodation,
} from "../../src/controllers/accommodationController";
import { Request, Response } from "express";
import * as accommodationService from "../../src/services/accommodation.service";
import { BAD_REQUEST, CREATED, SUCCESS } from "../../src/const";

jest.mock("../../src/services/accommodation.service");

describe("accommodationController.ts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("getAccommodations", () => {
    const mockReqAndRes = () => ({
      mReq: {} as Request,
      mRes: {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response,
    });
    it("Should be defined", () => {
      expect(getAccommodations).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getAccommodations).toBe("function");
    });
    it("should call findAccomodations once", async () => {
      const mReq = {} as Request;
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.resolve([]));
      const a = await getAccommodations(mReq, mRes);
      expect(accommodationService.findAccommodations).toBeCalledTimes(1);
    });
    it("should return status 200 and json", async () => {
      const data = [{ name: "o1" }, { name: "o2" }];
      const { mReq, mRes } = mockReqAndRes();
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.resolve(data));
      await getAccommodations(mReq, mRes);
      expect(mRes.json).toBeCalledWith({
        status: SUCCESS,
        length: data.length,
        data,
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
    const mockReqAndRes = () => ({
      mReq: {
        body: {
          location: "Nice",
          name: "Nikola",
          price: 254,
          profileImage: "random image",
        },
      } as Request,
      mRes: {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response,
    });
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
