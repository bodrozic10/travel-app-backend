import { NextFunction, Request, Response } from "express";
import { IAccomodation } from "../interface/accommodation";
import {
  findAccommodations,
  createAccommodation as makeAccomodation,
} from "../services/accommodation.service";
import { BAD_REQUEST, CREATED, OK, SUCCESS } from "../const";
import AppError from "../utils/AppError";

const getAccommodations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await findAccommodations();
    res.status(OK).json({
      status: SUCCESS,
      length: data.length,
      data,
    });
  } catch (error: any) {
    return next(new AppError(error, BAD_REQUEST));
  }
};

const createAccommodation = async (
  req: Request<{}, {}, IAccomodation, {}>,
  res: Response,
  next: NextFunction
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
    return next(new AppError(error, BAD_REQUEST));
  }
};

export { getAccommodations, createAccommodation };
