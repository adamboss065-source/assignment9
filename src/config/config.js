import dotenv from "dotenv";

dotenv.config();

export const JWT_ACCESS_EXPIRES_IN = Number(process.env.JWT_ACCESS_EXPIRES_IN);

export const JWT_USER_ACCESS_SIGNATURE = process.env.JWT_USER_ACCESS_SIGNATURE;

export const JWT_ADMIN_ACCESS_SIGNATURE =
  process.env.JWT_ADMIN_ACCESS_SIGNATURE;

export const JWT_REFRESH_EXPIRES_IN = Number(
  process.env.JWT_REFRESH_EXPIRES_IN,
);

export const JWT_USER_REFRESH_SIGNATURE =
  process.env.JWT_USER_REFRESH_SIGNATURE;

export const JWT_ADMIN_REFRESH_SIGNATURE =
  process.env.JWT_ADMIN_REFRESH_SIGNATURE;
