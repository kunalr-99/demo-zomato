import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("auth-user", UserSchema);
