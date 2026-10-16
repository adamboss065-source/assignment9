import { createLoginTokens } from "../../security/token.security.js";
import { findonebyid } from "../../DB/models/db.repo.js";
import userModel from "../../DB/models/user.model.js";

export async function rotatetoken(payload) {
  const user = await findonebyid({
    model: userModel,
    id: payload.sub,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return createLoginTokens({ user });
}
