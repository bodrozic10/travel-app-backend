import { Request, Response } from "express";
import { BAD_REQUEST, FAIL, OK, SUCCESS } from "../const";
import { IUser, IUserCredentials } from "../interface/user";
import { loginUser, signupUser, protectRoute } from "../services/auth.service";

const signup = async (req: Request<{}, {}, IUser>, res: Response) => {
  try {
    const {
      email,
      password,
      createdAt,
      image,
      name,
      passwordChangedAt,
      passwordResetToken,
      username,
      passwordConfirm,
    } = req.body;
    const token = await signupUser({
      email,
      password,
      createdAt,
      image,
      name,
      passwordChangedAt,
      passwordResetToken,
      username,
      passwordConfirm,
    });
    res.status(OK).json({
      status: SUCCESS,
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

const login = async (req: Request<{}, {}, IUserCredentials>, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });
    res.status(OK).json({
      status: SUCCESS,
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

const protect = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;
    const user = await protectRoute(token as string);
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

export { login, signup, protect };
