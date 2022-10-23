import {
  findDocuments,
  createDocument,
  selectFields,
} from "../../src/services/helper.service";
import { DB_MODEL_MOCK, DB_QUERY_MOCK } from "../../src/const";
import { MOCK_RETURN_VALUE_ARRAY } from "../../src/const";

describe("QueryService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("findDocuments", () => {
    it("should be definded", () => {
      expect(findDocuments).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof findDocuments).toBe("function");
    });
    it("Should return expected value", async () => {
      DB_MODEL_MOCK.find = jest.fn().mockResolvedValue(MOCK_RETURN_VALUE_ARRAY);
      const result = await findDocuments(DB_MODEL_MOCK);
      expect(result).toEqual(MOCK_RETURN_VALUE_ARRAY);
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
      DB_MODEL_MOCK.create = jest
        .fn()
        .mockResolvedValue(MOCK_RETURN_VALUE_ARRAY);
      const result = await createDocument(DB_MODEL_MOCK);
      expect(result).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("Should throw error", async () => {
      DB_MODEL_MOCK.create = jest.fn().mockRejectedValue(new Error("Error"));
      await expect(createDocument(DB_MODEL_MOCK)).rejects.toThrow("Error");
    });
  });
  describe("selectFields", () => {
    it("should be definded", () => {
      expect(selectFields).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof selectFields).toBe("function");
    });
    it("Should return expected value", async () => {
      const selectMock = (DB_QUERY_MOCK.select = jest
        .fn()
        .mockImplementationOnce(() => {}));
      selectFields(DB_QUERY_MOCK, ["name"]);
      expect(selectMock).toBeCalledWith("name");
    });
  });
});
