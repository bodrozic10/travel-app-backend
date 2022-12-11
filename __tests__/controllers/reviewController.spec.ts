import { Request } from "express";
import { mockReqAndRes, OK } from "../../src/const";
import {
  createReview,
  getReviews,
} from "../../src/controllers/reviewController";
import * as reviewService from "../../src/services/reviewService";

describe("Review Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const { mReq, mRes, next } = mockReqAndRes();

  describe("getReviews", () => {
    it("should be defined", () => {
      expect(getReviews).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof getReviews).toBe("function");
    });
    it("should return status 200 when success", async () => {
      jest
        .spyOn(reviewService, "getAllReviews")
        .mockImplementationOnce(() => Promise.resolve([]));
      await getReviews(mReq, mRes, next);
      expect(mRes.status).toHaveBeenCalledWith(OK);
    });
    it("should call next function if fails", async () => {
      jest
        .spyOn(reviewService, "getAllReviews")
        .mockImplementationOnce(() => Promise.reject());
      await getReviews(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("createReview", () => {
    it("should be defined", () => {
      expect(createReview).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof createReview).toBe("function");
    });
    it("should return status 201 when success", async () => {
      jest
        .spyOn(reviewService, "addReview")
        .mockImplementationOnce(() => Promise.resolve() as Promise<any>);
      await createReview(mReq, mRes, next);
      expect(mRes.status).toHaveBeenCalledWith(201);
    });
    it("should call next function if fails", async () => {
      jest
        .spyOn(reviewService, "addReview")
        .mockImplementationOnce(() => Promise.reject());
      await createReview({} as Request as any, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
