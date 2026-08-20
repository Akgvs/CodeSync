import express from "express";
import {
  getKey,
  createOrder,
  verifyPayment,
  getSubscriptionStatus,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/key", getKey);
router.get("/status", getSubscriptionStatus);
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

export default router;
