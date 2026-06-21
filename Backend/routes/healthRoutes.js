import express from "express";
import { getApiStatus, checkHealth } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", getApiStatus);
router.get("/health", checkHealth);

export default router;
