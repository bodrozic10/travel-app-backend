import { createUser, findUsers } from "../../src/services/user.service";
import * as helperService from "../../src/services/helper.service";
import { MOCK_RETURN_VALUE_ARRAY } from "../../src/const";

jest.mock("../../src/services/helper.service");

describe("User Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("createUser", () => {
    it("should be definded", () => {
      expect(createUser).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof createUser).toBe("function");
    });
    it("Should call createDocument", async () => {
      const createDocumentMock = jest
        .spyOn(helperService, "createDocument")
        .mockImplementationOnce(() => Promise.resolve([]));
      await createUser();
      expect(createDocumentMock).toHaveBeenCalledTimes(1);
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(helperService, "createDocument")
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));

      const result = await createUser();
      expect(result).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("Should throw error when createDocument throws error", async () => {
      jest
        .spyOn(helperService, "createDocument")
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(createUser()).rejects.toThrow("Error");
    });
  });
  describe("findUsers", () => {
    it("should be definded", () => {
      expect(findUsers).toBeDefined();
    });

    it("should be function", () => {
      expect(typeof findUsers).toBe("function");
    });
    it("Should return expected value", async () => {
      jest
        .spyOn(helperService, "findDocuments")
        .mockImplementationOnce(() => Promise.resolve(MOCK_RETURN_VALUE_ARRAY));
      const result = await findUsers();
      expect(result).toEqual(MOCK_RETURN_VALUE_ARRAY);
    });
    it("Should throw error", async () => {
      jest
        .spyOn(helperService, "findDocuments")
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));
      await expect(findUsers()).rejects.toThrow("Error");
    });
  });
});
