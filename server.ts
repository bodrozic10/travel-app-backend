import mongoose from "mongoose";
import { config } from "dotenv";
import app from "./app";

config();

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URL as string, {}, () => {
  console.log(`connected to db`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
