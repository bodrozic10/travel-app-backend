import express from "express";
import { getUsers } from "../controllers/userController";
import { signup, login } from "../controllers/authController";

const router = express.Router();

router.route("/").get(getUsers);

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;
