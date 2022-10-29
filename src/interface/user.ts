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

export interface IUserCredentials {
  email: string;
  password: string;
}
