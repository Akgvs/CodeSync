import express from "express";
import { createRoom, getRoomById, getSharedRooms, getRoomStats } from "../controllers/roomController.js";

const router = express.Router();

router.route("/stats/live").get(getRoomStats);
router.route("/").post(createRoom);
router.route("/shared/:clerkId").get(getSharedRooms);
router.route("/:roomId").get(getRoomById); // Must be after explicit routes

export default router;
