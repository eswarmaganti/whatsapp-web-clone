import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female", "trans"],
    },
    about: {
      type: String,
      required: false,
      max: 200,
      default: "Hey there! i am using whatsapp",
    },
  },
  { timestamp: true }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model("User", userSchema);
export default User;
