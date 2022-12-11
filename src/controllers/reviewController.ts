import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, CREATED } from "../const";
import { IReview } from "../interface/review";
import { addReview, getAllReviews } from "../services/reviewService";
import AppError from "../utils/AppError";

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await getAllReviews(req.params.accommodationId);
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: { reviews },
    });
  } catch (err: any) {
    return next(new AppError(err, BAD_REQUEST));
  }
};

export const createReview = async (
  req: Request<any, {}, IReview>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accommodationId = req.params.accommodationId;
    const { createdAt, text } = req.body;
    const review = await addReview({
      accommodation: accommodationId,
      user: req.currentUser.id,
      createdAt,
      text,
    });
    res.status(CREATED).json({
      success: true,
      data: { review },
    });
  } catch (error: any) {
    return next(new AppError(error, BAD_REQUEST));
  }
};

export const updateReview = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: `Update review ${req.params.id}`,
  });
};

export const deleteReview = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: `Delete review ${req.params.id}`,
  });
};
