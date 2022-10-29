import express from "express";
import { getUsers, signup, login } from "../controllers/userController";

const router = express.Router();

router.route("/").get(getUsers);

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;
