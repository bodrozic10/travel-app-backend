import { Request, Response } from "express";
import { IAccomodation } from "../interface/accommodation";
import {
  findAccommodations,
  createAccommodation as makeAccomodation,
} from "../services/accommodation.service";
import { BAD_REQUEST, CREATED, OK, FAIL, SUCCESS } from "../const";

const getAccommodations = async (req: Request, res: Response) => {
  try {
    const data = await findAccommodations();
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
    const {
      accommodationType,
      amenities,
      description,
      images,
      location,
      maxGuests,
      name,
      numBaths,
      numBeds,
      price,
      averageScore,
    } = req.body;

    const accommodation = await makeAccomodation({
      accommodationType,
      amenities,
      description,
      host: req.currentUser.id,
      images,
      location,
      maxGuests,
      name,
      numBaths,
      numBeds,
      price,
      averageScore,
    });

    return res.status(CREATED).json({
      status: SUCCESS,
      accommodation,
    });
  } catch (error: any) {
    return res.status(BAD_REQUEST).json({
      status: FAIL,
      message: error.message,
    });
  }
};

export { getAccommodations, createAccommodation };
