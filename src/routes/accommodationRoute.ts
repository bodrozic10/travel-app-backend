import express from "express";
import {
  getAccommodations,
  createAccommodation,
  getAccommodation,
  searchSuggestions,
} from "../controllers/accommodationController";
import { protect } from "../controllers/authController";
import reviewRouter from "./reviewRoute";

const router = express.Router();

router.route("/search").get(searchSuggestions);
router.use("/:accommodationId/reviews", reviewRouter);
router.route("/").get(getAccommodations).post(protect, createAccommodation);
router.route("/:id").get(getAccommodation);

export default router;
