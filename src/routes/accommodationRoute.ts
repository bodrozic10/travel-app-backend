import express from "express";
import {
  getAccommodations,
  createAccommodation,
} from "../controllers/accommodationController";
import { protect } from "../controllers/authController";

const router = express.Router();

router.route("/").get(getAccommodations).post(protect, createAccommodation);

export default router;
