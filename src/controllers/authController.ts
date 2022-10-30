import { Request, Response } from "express";
import { BAD_REQUEST, FAIL, OK, SUCCESS } from "../const";
import { IUser, IUserCredentials } from "../interface/user";
import { generateJWTToken } from "../services/auth.helper.service";
import { loginUser, signupUser } from "../services/auth.service";

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
    const newUser = await signupUser({
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
    const token = await generateJWTToken(newUser._id);
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

export { login, signup };
