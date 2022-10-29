import { Request, Response } from "express";
import {
  createUser,
  findUsers,
  generateJWTToken,
  loginUser,
} from "../services/user.service";
import { IUser, IUserCredentials } from "../interface/user";
import { BAD_REQUEST, FAIL, OK, SUCCESS } from "../const";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findUsers();
    res.status(OK).json({
      status: SUCCESS,
      length: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

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
    const newUser = await createUser({
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

export { getUsers, signup, login };
