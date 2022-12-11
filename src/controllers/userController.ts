import { NextFunction, Request, Response } from "express";
import { findUsers, deleteUser, updateUser } from "../services/user.service";
import { BAD_REQUEST, FAIL, OK, SUCCESS } from "../const";
import AppError from "../utils/AppError";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findUsers();
    res.status(OK).json({
      status: SUCCESS,
      length: users.length,
      data: {
        users,
      },
    });
  } catch (error: any) {
    return next(new AppError(error, BAD_REQUEST));
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser(req.params.id);
    res.status(OK).json({
      status: SUCCESS,
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error, BAD_REQUEST));
  }
};

const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, image } = req.body;
    const updatedUser = await updateUser(req.currentUser.id, {
      name,
      username,
      image,
    });
    res.status(OK).json({
      status: SUCCESS,
      data: {
        user: updatedUser,
      },
    });
  } catch (error: any) {
    return next(new AppError(error, BAD_REQUEST));
  }
};

export { getUsers, removeUser, updateMe };
