import { Request, Response } from "express";
import { Accommodation, IAccomodation } from "../models";
import {
  findAccommodations,
  createAccommodation as makeAccomodation,
} from "../services/accommodation.service";
import { BAD_REQUEST, CREATED, OK, FAIL, SUCCESS } from "../const";

const getAccommodations = async (req: Request, res: Response) => {
  try {
    const data = await findAccommodations(Accommodation);
    return res.status(OK).json({
      status: SUCCESS,
      length: data.length,
      data,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

const createAccommodation = async (
  req: Request<{}, {}, IAccomodation, {}>,
  res: Response
) => {
  try {
    const { location, name, price, profileImage, averageScore } = req.body;

    const accommodation = await makeAccomodation(Accommodation, {
      averageScore,
      location,
      name,
      price,
      profileImage,
    });

    return res.status(CREATED).json({
      status: SUCCESS,
      accommodation,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

export { getAccommodations, createAccommodation };
