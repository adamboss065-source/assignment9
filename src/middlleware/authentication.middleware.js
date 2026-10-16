import { TokenType } from "../common/enum/token.enum.js";
import { checkToken } from "../security/token.security.js";

function auth(tokenType = TokenType.access) {
  return async function (req, res, next) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new Error("Token not found");
      }
      const token = authorization.startsWith("Bearer ")
        ? authorization.split(" ")[1]
        : authorization;
      const { user, payload } = await checkToken({
        token,
        tokenType,
      });
      req.user = user;
      req.payload = payload;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized",
        error: error.message,
      });
    }
  };
}

export default auth;
