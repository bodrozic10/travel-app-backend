import {
  getAccommodations,
  createAccommodation,
  getAccommodation,
  searchSuggestions,
} from "../../src/controllers/accommodationController";
import * as accommodationService from "../../src/services/accommodation.service";
import {
  CREATED,
  MOCK_RETURN_VALUE_ARRAY,
  MOCK_OBJECT,
  mockReqAndRes,
  OK,
} from "../../src/const";

jest.mock("../../src/services/accommodation.service");

describe("accommodationController.ts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const { mReq, mRes, next } = mockReqAndRes();
  describe("getAccommodations", () => {
    it("Should be defined", () => {
      expect(getAccommodations).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getAccommodations).toBe("function");
    });
    it("should call findAccomodations once", async () => {
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_RETURN_VALUE_ARRAY) as Promise<any>
        );
      await getAccommodations(mReq, mRes, next);
      expect(accommodationService.findAccommodations).toBeCalledTimes(1);
    });
    it("should return status 200 and json", async () => {
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_RETURN_VALUE_ARRAY) as Promise<any>
        );
      await getAccommodations(mReq, mRes, next);
      expect(mRes.status).toBeCalledWith(OK);
    });
    it("should call next function if fails", async () => {
      jest
        .spyOn(accommodationService, "findAccommodations")
        .mockImplementationOnce(() => Promise.reject("error"));
      await getAccommodations(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
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
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await createAccommodation(mReq, mRes, next);
      expect(accommodationService.createAccommodation).toBeCalledTimes(1);
    });
    it("should return status 201", async () => {
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await createAccommodation(mReq, mRes, next);
      expect(mRes.status).toHaveBeenCalledWith(CREATED);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(accommodationService, "createAccommodation")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await createAccommodation(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("getAccommodation", () => {
    it("Should be defined", () => {
      expect(getAccommodation).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof getAccommodation).toBe("function");
    });
    it("should call getAccommodation once", async () => {
      jest
        .spyOn(accommodationService, "findAccommodation")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await getAccommodation(mReq, mRes, next);
      expect(accommodationService.findAccommodation).toBeCalledTimes(1);
    });
    it("should return status 200", async () => {
      jest
        .spyOn(accommodationService, "findAccommodation")
        .mockImplementationOnce(
          () => Promise.resolve(MOCK_OBJECT) as Promise<any>
        );
      await getAccommodation(mReq, mRes, next);
      expect(mRes.status).toHaveBeenCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(accommodationService, "findAccommodation")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await getAccommodation(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("searchSuggestions", () => {
    it("Should be defined", () => {
      expect(searchSuggestions).toBeDefined();
    });
    it("Should be a function", () => {
      expect(typeof searchSuggestions).toBe("function");
    });
    it("should call searchSuggestionsService once", async () => {
      jest
        .spyOn(accommodationService, "searchSuggestions")
        .mockImplementationOnce(() => Promise.resolve([]) as Promise<any>);
      await searchSuggestions(mReq, mRes, next);
      expect(accommodationService.searchSuggestions).toBeCalledTimes(1);
    });
    it("should return status 200", async () => {
      jest
        .spyOn(accommodationService, "searchSuggestions")
        .mockImplementationOnce(() => Promise.resolve([]) as Promise<any>);
      await searchSuggestions(mReq, mRes, next);
      expect(mRes.status).toHaveBeenCalledWith(OK);
    });
    it("should call next if fails", async () => {
      jest
        .spyOn(accommodationService, "searchSuggestions")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await searchSuggestions(mReq, mRes, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
