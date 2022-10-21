import { findDocuments } from "../../src/services/query.service";
import mongoose from "mongoose";

const MockedModel = {} as mongoose.Model<any>;

describe("QueryService", () => {
  it("should be definded", () => {
    expect(findDocuments).toBeDefined();
  });

  it("should be function", () => {
    expect(typeof findDocuments).toBe("function");
  });
  it("Should return expected value", async () => {
    MockedModel.find = jest
      .fn()
      .mockResolvedValue([{ name: "Nikola" }, { name: "Tesla" }]);
    const result = await findDocuments(MockedModel);
    expect(result).toEqual([{ name: "Nikola" }, { name: "Tesla" }]);
  });
  it("Should throw error", async () => {
    MockedModel.find = jest.fn().mockRejectedValue(new Error("Error"));
    await expect(findDocuments(MockedModel)).rejects.toThrow("Error");
  });
});
