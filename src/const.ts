import mongoose from "mongoose";

// statuscode
export const OK = 200;
export const BAD_REQUEST = 404;
export const CREATED = 201;
export const NO_CONTENT = 204;

// response message
export const SUCCESS = "success";
export const FAIL = "fail";

// MOCKS
export const DB_MODEL_MOCK = {} as mongoose.Model<any>;
