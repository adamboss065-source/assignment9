import mongoose from "mongoose";
import { GenderEnum, roleEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
    },
    lasteName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    role: {
      type: Number,
      enum: Object.values(roleEnum),
      default: roleEnum.user,
    },
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.MALE,
    },
    DOB: Date,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profilepicpath: String,
    coverpicpath: [String],
    DaletedAt: Date,
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema
  .virtual("username")
  .get(function () {
    return `${this.get("firstName")}  ${this.get("lasteName")}`;
  })
  .set(function (value) {
    const [firstName, lasteName] = value.split(" ") || [];
    this.set({ firstName, lasteName });
  });
const usermodel = mongoose.model("User", userSchema);
export default usermodel;
