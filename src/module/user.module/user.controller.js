import { Router } from "express";
import auth from "../../middlleware/authentication.middleware.js";
import { TokenType } from "../../common/enum/token.enum.js";
import { rotatetoken } from "./user.service.js";
import authorization from "../../middlleware/authorization.middleware.js";
import { roleEnum } from "../../common/enum/user.enum.js";
const userRouter = Router();

userRouter.get(
  "/get-profile",
  auth(),
  authorization([roleEnum.admin]),
  async (req, res) => {
    try {
      return res
        .status(200)
        .json({ msg: "created", user: req.user, payload: req.payload });
    } catch (error) {
      res.status(500).json({
        message: "Error aggregating notes",
        error: error.message,
      });
    }
  },
);

userRouter.post("/rotate-token", auth(TokenType.refresh), async (req, res) => {
  try {
    const result = await rotatetoken(req.payload);

    return res.status(200).json({
      msg: "Tokens rotated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default userRouter;
