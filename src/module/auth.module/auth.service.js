import { model } from "mongoose";
import { createdoc, findonedoc } from "../../DB/models/db.repo.js";
import usermodel from "../../DB/models/user.model.js";
import { comparedValue, hashedValue } from "../../security/hash.js";
import { HashToolEnum } from "../../common/enum/hash.enum.js";
import { dencryptvalue, encryptvalue } from "../../security/encrypt.js";
import jwt from "jsonwebtoken";
import { createLoginTokens } from "../../security/token.security.js";
export async function signup(userData) {
  const { email } = userData;
  const userEmail = await findonedoc({ model: usermodel, filter: { email } });
  if (userEmail) {
    throw new Error("Email Already Exists", { cause: { statusCide: 409 } });
  }
  // userData.password = await hash(userData.password, 12);
  userData.password = await hashedValue({
    value: userData.password,
    tool: HashToolEnum.ARGON,
  });
  userData.phone = encryptvalue({ value: userData.phone });

  const newUser = await createdoc({ model: usermodel, inserteddata: userData });
  return newUser;
}
export async function login(userData) {
  const { email, password } = userData;
  const user = await findonedoc({ model: usermodel, filter: { email } });
  if (!user) {
    throw new Error("Invalid email or passsword");
  }
  const isMatch = await comparedValue({
    value: password,
    hash: user.password,
    tool: HashToolEnum.ARGON,
  });
  user.phone = dencryptvalue({ ciphervalue: user.phone });
  if (!isMatch) {
    throw new Error("Invalid email or passsword");
  }
  return createLoginTokens({ user });
}
