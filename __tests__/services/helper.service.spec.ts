import {
  findDocuments,
  createDocument,
} from "../../src/services/helper.service";
import { DB_MODEL_MOCK } from "../../src/const";

describe("QueryService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const mockedValue = [{ name: "Nikola" }, { name: "Tesla" }];
  describe("findDocuments", () => {
    it("should be definded", () => {
      expect(findDocuments).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof findDocuments).toBe("function");
    });
    it("Should return expected value", async () => {
      DB_MODEL_MOCK.find = jest.fn().mockResolvedValue(mockedValue);
      const result = await findDocuments(DB_MODEL_MOCK);
      expect(result).toEqual(mockedValue);
    });
    it("Should throw error", async () => {
      DB_MODEL_MOCK.find = jest.fn().mockRejectedValue(new Error("Error"));
      await expect(findDocuments(DB_MODEL_MOCK)).rejects.toThrow("Error");
    });
  });
  describe("createDocument", () => {
    it("should be definded", () => {
      expect(createDocument).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof createDocument).toBe("function");
    });
    it("Should return expected value", async () => {
      DB_MODEL_MOCK.create = jest.fn().mockResolvedValue(mockedValue);
      const result = await createDocument(DB_MODEL_MOCK);
      expect(result).toEqual(mockedValue);
    });
    it("Should throw error", async () => {
      DB_MODEL_MOCK.create = jest.fn().mockRejectedValue(new Error("Error"));
      await expect(createDocument(DB_MODEL_MOCK)).rejects.toThrow("Error");
    });
  });
});
