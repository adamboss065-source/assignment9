import * as bcrypt from "bcrypt";
import * as argon from "argon2";
import { HashToolEnum } from "../common/enum/hash.enum.js";

export async function hashedValue({
  value,
  saltRound = Number(process.env.SALR_ROUND),
  tool = HashToolEnum.BCRYPT,
}) {
  let hashedValue;
  switch (tool) {
    case HashToolEnum.BCRYPT:
      hashedValue = await bcrypt.hash(value, saltRound);
      break;
    case HashToolEnum.ARGON:
      hashedValue = await argon.hash(value);
      break;
    default:
      break;
  }

  return hashedValue;
}

export async function comparedValue({
  value,
  hash,
  tool = HashToolEnum.BCRYPT,
}) {
  let comparedValue;
  switch (tool) {
    case HashToolEnum.BCRYPT:
      comparedValue = await bcrypt.compare(value, hash);
      break;
    case HashToolEnum.ARGON:
      comparedValue = await argon.verify(hash, value);
      break;
    default:
      break;
  }

  return comparedValue;
}
