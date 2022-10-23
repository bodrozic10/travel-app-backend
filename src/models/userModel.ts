import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { selectFields } from "../services/helper.service";

export interface IUser {
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordConfirm: string | undefined;
  name: string;
  createdAt: Date;
  username: string;
  image: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    createdAt: Date,
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, el: string) {
          return this.password === el;
        },
        message: `Passwords don't match`,
      },
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    image: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("find", async function (next) {
  selectFields(this, ["-__v", "-password"]);
  next();
});

export const User = mongoose.model("User", userSchema);
