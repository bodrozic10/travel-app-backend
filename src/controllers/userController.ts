import { Request, Response } from "express";
import { findUsers, deleteUser, updateUser } from "../services/user.service";
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

const removeUser = async (req: Request, res: Response) => {
  try {
    await deleteUser(req.params.id);
    res.status(OK).json({
      status: SUCCESS,
      data: null,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

const updateMe = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

export { getUsers, removeUser, updateMe };
