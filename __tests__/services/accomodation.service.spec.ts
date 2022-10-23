import {
  findAccommodations,
  createAccommodation,
} from "../../src/services/accommodation.service";
import * as accommodationHelperService from "../../src/services/helper.service";

jest.mock("../../src/services/helper.service");

describe("AccommodationService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("findaccommodations", () => {
    const mockedArray = [{ name: "test" }];
    it("should be defined", () => {
      expect(findAccommodations).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof findAccommodations).toBe("function");
    });
    it("Should call findDocuments function once", async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      await findAccommodations();
      expect(accommodationHelperService.findDocuments).toHaveBeenCalledTimes(1);
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      const result = await findAccommodations();
      expect(result).toEqual(mockedArray);
    });
    it("Should throw error if findDocuments throws error", async () => {
      jest
        .spyOn(accommodationHelperService, "findDocuments")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await expect(findAccommodations()).rejects.toThrowError("error");
    });
  });
  describe("createAccommodations", () => {
    const mockedArray = [{ name: "test" }];
    it("should be defined", () => {
      expect(createAccommodation).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof createAccommodation).toBe("function");
    });
    it("Should call createDocument function once", async () => {
      jest
        .spyOn(accommodationHelperService, "createDocument")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      await createAccommodation();
      expect(accommodationHelperService.createDocument).toHaveBeenCalledTimes(
        1
      );
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(accommodationHelperService, "createDocument")
        .mockImplementationOnce(() => Promise.resolve(mockedArray));
      const result = await createAccommodation();
      expect(result).toEqual(mockedArray);
    });
    it("Should throw error if createDocument throws error", async () => {
      jest
        .spyOn(accommodationHelperService, "createDocument")
        .mockImplementationOnce(() => Promise.reject(new Error("error")));
      await expect(createAccommodation()).rejects.toThrowError("error");
    });
  });
});
