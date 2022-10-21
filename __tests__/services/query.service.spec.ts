import { findDocuments } from "../../src/services/query.service";
import { DB_MODEL_MOCK } from "../../src/const";

describe("QueryService", () => {
  it("should be definded", () => {
    expect(findDocuments).toBeDefined();
  });

  it("should be function", () => {
    expect(typeof findDocuments).toBe("function");
  });
  it("Should return expected value", async () => {
    DB_MODEL_MOCK.find = jest
      .fn()
      .mockResolvedValue([{ name: "Nikola" }, { name: "Tesla" }]);
    const result = await findDocuments(DB_MODEL_MOCK);
    expect(result).toEqual([{ name: "Nikola" }, { name: "Tesla" }]);
  });
  it("Should throw error", async () => {
    DB_MODEL_MOCK.find = jest.fn().mockRejectedValue(new Error("Error"));
    await expect(findDocuments(DB_MODEL_MOCK)).rejects.toThrow("Error");
  });
});
