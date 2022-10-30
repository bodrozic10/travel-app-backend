import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IUser, IUserMethods } from "../interface/user";

const userSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
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
      select: false,
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

userSchema.methods.comparePassword = async function (
  password: string,
  hashPassword: string
) {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    throw error;
  }
};

userSchema.pre("save", async function (next) {
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre(/^find/, function (this: mongoose.Query<{}, IUser>, next) {
  this.select("-__v");
  next();
});

export const User = mongoose.model("User", userSchema);
