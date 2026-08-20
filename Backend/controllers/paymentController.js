import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";

// Get Razorpay Public Key
export const getKey = async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  });
};

// Create Razorpay Order
export const createOrder = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const { plan = "Pro", currency = "INR" } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Pro plan price: ₹999 INR (99900 paise)
    const planPrices = {
      Pro: 99900, // in paise (₹999)
      Free: 0,
    };

    const amount = planPrices[plan] || 99900;

    if (amount === 0) {
      // Free plan update directly
      const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          subscription: {
            plan: "Free",
            status: "active",
            updatedAt: new Date(),
          },
        },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: "Subscribed to Free plan successfully",
        subscription: user.subscription,
      });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay keys are configured, create order via Razorpay API
    if (key_id && key_secret && key_id !== "rzp_test_placeholder") {
      const instance = new Razorpay({ key_id, key_secret });

      const options = {
        amount,
        currency,
        receipt: `receipt_${Date.now()}_${userId.slice(-6)}`,
        notes: {
          clerkId: userId,
          plan,
        },
      };

      const order = await instance.orders.create(options);

      return res.status(200).json({
        success: true,
        order,
        key: key_id,
      });
    } else {
      // Development Test Mode Order Generation
      const testOrder = {
        id: `order_test_${Date.now()}`,
        entity: "order",
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        status: "created",
        notes: { clerkId: userId, plan },
      };

      return res.status(200).json({
        success: true,
        order: testOrder,
        key: key_id || "rzp_test_placeholder",
        isTestMode: true,
      });
    }
  } catch (error) {
    console.error("[Razorpay Order Error]:", error);
    next(error);
  }
};

// Verify Razorpay Payment Signature
export const verifyPayment = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan = "Pro" } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    let isAuthentic = false;

    if (key_secret && key_secret !== "dummy_secret" && razorpay_signature) {
      const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      isAuthentic = generated_signature === razorpay_signature;
    } else {
      // In development test mode, accept simulated payment completions
      isAuthentic = true;
    }

    if (isAuthentic) {
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        user = new User({ clerkId: userId, email: req.body.email || "user@example.com" });
      }

      user.subscription = {
        plan,
        status: "active",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        updatedAt: new Date(),
      };

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified and subscription activated successfully!",
        subscription: user.subscription,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature verification failed",
      });
    }
  } catch (error) {
    console.error("[Razorpay Verification Error]:", error);
    next(error);
  }
};

// Get Subscription Status
export const getSubscriptionStatus = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: userId });

    res.status(200).json({
      success: true,
      subscription: user?.subscription || { plan: "Free", status: "active" },
    });
  } catch (error) {
    next(error);
  }
};
