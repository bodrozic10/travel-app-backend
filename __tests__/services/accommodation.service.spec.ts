import {
  createAccommodation,
  findAccommodations,
  searchSuggestions,
} from "../../src/services/accommodation.service";
import { Accommodation } from "../../src/models/accommodationModel";
import { IAccomodation } from "../../src/interface/accommodation";
import { MOCK_RETURN_VALUE_ARRAY, MOCK_OBJECT } from "../../src/const";

describe("accommodationService", () => {
  describe("findAccommodations", () => {
    it("should be defined", () => {
      expect(findAccommodations).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof findAccommodations).toBe("function");
    });
    it("should return an object", async () => {
      Accommodation.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      expect(await findAccommodations()).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("should throw an error", async () => {
      Accommodation.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(findAccommodations()).rejects.toThrow("Error");
    });
  });
  describe("createAccommodation", () => {
    it("should be defined", () => {
      expect(createAccommodation).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof createAccommodation).toBe("function");
    });
    it("should return an accommodation", async () => {
      Accommodation.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_OBJECT));
      expect(await createAccommodation({} as IAccomodation)).toEqual(
        MOCK_OBJECT
      );
    });
    it("should throw an error", async () => {
      Accommodation.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(createAccommodation({} as IAccomodation)).rejects.toThrow(
        "Error"
      );
    });
  });
  describe("searchSuggestions", () => {
    it("should be defined", () => {
      expect(searchSuggestions).toBeDefined();
    });
    it("should be function", () => {
      expect(typeof searchSuggestions).toBe("function");
    });
    it("should return an array", async () => {
      Accommodation.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      expect(await searchSuggestions("test")).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("should throw an error", async () => {
      Accommodation.find = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(searchSuggestions("test")).rejects.toThrow("Error");
    });
  });
});
