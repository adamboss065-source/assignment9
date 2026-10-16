import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_USER_ACCESS_SIGNATURE,
  JWT_REFRESH_EXPIRES_IN,
  JWT_USER_REFRESH_SIGNATURE,
  JWT_ADMIN_ACCESS_SIGNATURE,
  JWT_ADMIN_REFRESH_SIGNATURE,
} from "../config/config.js";
import { roleEnum } from "../common/enum/user.enum.js";
import { TokenType } from "../common/enum/token.enum.js";
import { findonebyid } from "../DB/models/db.repo.js";
import userModel from "../DB/models/user.model.js";

export function signToken({ payload = {}, signture, options }) {
  return jwt.sign(payload, signture, options);
}
export function verifyToken({ token, signture } = {}) {
  return jwt.verify(token, signture);
}
export function decodeToken(token) {
  return jwt.decode(token);
}
export function GetSign(userRole = roleEnum.user) {
  let signtures = {};
  switch (userRole) {
    case roleEnum.user:
      signtures.ACCESS_token = JWT_USER_ACCESS_SIGNATURE;
      signtures.REFRESH_token = JWT_USER_REFRESH_SIGNATURE;
      break;
    case roleEnum.admin:
      signtures.ACCESS_token = JWT_ADMIN_ACCESS_SIGNATURE;
      signtures.REFRESH_token = JWT_ADMIN_REFRESH_SIGNATURE;
      break;
    default:
      throw new Error("Invalid user role");
  }
  return signtures;
}
export function createLoginTokens({
  user,
  options,
  refreshExpIn = JWT_REFRESH_EXPIRES_IN,
} = {}) {
  const { ACCESS_token: access_signature, REFRESH_token: refresh_signature } =
    GetSign(user.role);
  const tokenOptions = {
    ...options,
    subject: user.id,
    audience: [String(user.role)],
  };
  const ACCESS_token = signToken({
    payload: {},
    signture: access_signature,
    options: {
      ...tokenOptions,
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    },
  });
  const REFRESH_token = signToken({
    payload: {},
    signture: refresh_signature,
    options: {
      ...tokenOptions,
      expiresIn: refreshExpIn,
    },
  });
  return { ACCESS_token, REFRESH_token };
}
export async function checkToken({ token, tokenType } = {}) {
  const payload = decodeToken(token);
  if (!payload || !payload.aud) {
    throw new Error("Invalid token data");
  }
  if (!payload.sub) {
    throw new Error("NOT found sub");
  }
  const { ACCESS_token: access_signature, REFRESH_token: refresh_signature } =
    GetSign(Number(payload.aud[0]));
  jwt.verify(
    token,
    tokenType === TokenType.access ? access_signature : refresh_signature,
  );
  const user = await findonebyid({
    model: userModel,
    id: payload.sub,
  });
  if (!user) {
    throw new Error("Not found id");
  }

  return { user, payload };
}
