import { Request, Response } from "express";
import { createUser as makeUser, findUsers } from "../services/user.service";
import { IUser } from "../interface/user";
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

const createUser = async (req: Request<{}, {}, IUser>, res: Response) => {
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
    const newUser = await makeUser({
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
        newUser,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

export { getUsers, createUser };
