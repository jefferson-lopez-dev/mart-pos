import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Email is not a valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    mixLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [50, "Fullname must be at least 50 characters"],
  },
});

const UserModel = models.User || model("User", userSchema);
export default UserModel;
