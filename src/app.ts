import express from "express";
import morgan from "morgan";
import accommodationRouter from "./routes/accommodationRoute";
import userRouter from "./routes/userRoute";
import { json } from "body-parser";
import { errorController } from "./controllers/errorController";

const app = express();

app.use(json());
app.use(morgan("dev"));

app.use("/api/v1/accommodations", accommodationRouter);
app.use("/api/v1/users", userRouter);

app.use(errorController);

export default app;
