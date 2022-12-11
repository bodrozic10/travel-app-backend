import { NextFunction, Request, Response } from "express";
import { FAIL } from "../const";

export const errorController = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: FAIL,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    return res.status(err.statusCode).json({
      status: FAIL,
      message: err.message,
    });
  }
};
