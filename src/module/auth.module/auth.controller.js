import { Router } from "express";
import { signup, login } from "./auth.service.js";
import * as z from "zod";
const authRouter = Router();
authRouter.post("/signup", async (req, res) => {
  try {
    const result = await signup(req.body);
    return res.status(200).json({ msg: "created", data: result });
  } catch (error) {
    res.status(500).json({
      message: "Error aggregating notes",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const getprofileSchema = z
    .object({
      email: z.string(),
      password: z.string(),
      phone: z.e164(),
      age: z.coerce.number({}).int().min(18).max(100),
      gender: z.enum(["male", "female"]),
      flag: z.stringbool({
        case: "sensitive",
        truthy: ["ali", "aya"],
        falsy: ["yousef", "3", "user"],
        error: "invalid flag",
      }),
      pageSize: z.coerce.number().optional(),
      test: z.literal("test"),
    })
    .catchall(z.string());
  const validateDate = getprofileSchema.parse(req.body);
  console.log(validateDate);

  const result = await login(req.body);
  return res.status(201).json({ msg: "done", data: result });
});
export default authRouter;
