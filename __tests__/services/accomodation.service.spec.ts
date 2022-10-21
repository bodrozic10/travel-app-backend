import { findAccommodations } from "../../src/services/accommodation.service";
import * as accommodationHelperService from "../../src/services/query.service";
import { DB_MODEL_MOCK } from "../../src/const";

jest.mock("../../src/services/query.service");

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
      await findAccommodations(DB_MODEL_MOCK);
      expect(findDocumentsMock).toHaveBeenCalledTimes(1);
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      const result = await findAccommodations(DB_MODEL_MOCK);
      expect(result).toEqual(mockedArray);
    });
    it('Should throw error if "findDocuments" throws error', async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await expect(findAccommodations(DB_MODEL_MOCK)).rejects.toThrowError(
        "error"
      );
    });
  });
});
