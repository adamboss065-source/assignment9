import express from "express";
import dotenv from "dotenv";
import globalErrMiddleware from "./middlleware/err.middlleware.js";
import notFoundMiddleware from "./middlleware/notfound.middlleware.js";
import connectDB from "./DB/connection.js";
import userRouter from "./module/user.module/user.controller.js";
import authRouter from "./module/auth.module/auth.controller.js";

dotenv.config();
const app = express();
app.use(express.json());
await connectDB();
app.use(userRouter);
app.use(authRouter);
app.use("{/*dummy}", notFoundMiddleware);
app.use(globalErrMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
