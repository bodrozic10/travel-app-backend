import { Request, Response } from "express";

// statuscode
export const OK = 200;
export const BAD_REQUEST = 404;
export const CREATED = 201;
export const NO_CONTENT = 204;

// response message
export const SUCCESS = "success";
export const FAIL = "fail";

// MOCKS
export const MOCK_RETURN_VALUE_ARRAY = [{ name: "Nikola" }, { name: "Mike" }];
export const MOCK_OBJECT = {};
export const USER_CREDENTIALS = {
  email: "email@example.com",
  password: "password",
};

export const mockReqAndRes = () => ({
  mReq: { body: {}, headers: { authorization: "token" } } as unknown as Request,
  mRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response,
  next: jest.fn(),
});
