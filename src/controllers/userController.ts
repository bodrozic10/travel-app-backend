import { Request, Response } from "express";
import { findUsers } from "../services/user.service";
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

export { getUsers };
