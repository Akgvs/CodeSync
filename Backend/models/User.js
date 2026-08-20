import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    subscription: {
      plan: {
        type: String,
        enum: ["Free", "Pro"],
        default: "Free",
      },
      status: {
        type: String,
        default: "active",
      },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      updatedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
