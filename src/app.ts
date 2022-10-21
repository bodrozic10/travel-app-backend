import express from "express";
import morgan from "morgan";
import { accommodationRouter } from "./routes";
import { json } from "body-parser";

const app = express();

app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/accommodations", accommodationRouter);

export default app;
