import mongoose from "mongoose";
import { findAccommodations } from "../../src/services/accommodation.service";
import * as accommodationHelperService from "../../src/services/query.service";

jest.mock("../../src/services/query.service");

const MockedModel = {} as mongoose.Model<any>;

describe("AccommodationService", () => {
  describe("findaccommodations", () => {
    const mockedArray = [{ name: "test" }];
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("should be defined", () => {
      expect(findAccommodations).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof findAccommodations).toBe("function");
    });
    it("Should call findDocuments function once", async () => {
      const findDocumentsMock = jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      await findAccommodations(MockedModel);
      expect(findDocumentsMock).toHaveBeenCalledTimes(1);
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      const result = await findAccommodations(MockedModel);
      expect(result).toEqual(mockedArray);
    });
    it('Should throw error if "findDocuments" throws error', async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await expect(findAccommodations(MockedModel)).rejects.toThrowError(
        "error"
      );
    });
  });
});
