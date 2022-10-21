import { Request, Response } from "express";
import { Accommodation, IAccomodation } from "../models";
import { findAccommodations } from "../services";
import { BAD_REQUEST, CREATED, OK, FAIL, SUCCESS } from "../const";

const getAccommodations = async (req: Request, res: Response) => {
  try {
    const data = await findAccommodations(Accommodation);
    res.status(OK).json({
      status: SUCCESS,
      length: data.length,
      data,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
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
    const accommodation = await Accommodation.create({
      averageScore,
      location,
      name,
      price,
      profileImage,
    });

    res.status(CREATED).json({
      status: SUCCESS,
      accommodation,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error,
    });
  }
};

export { getAccommodations, createAccommodation };
