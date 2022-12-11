export default class AppError extends Error {
  isOperational: boolean;
  statusCode: number;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
