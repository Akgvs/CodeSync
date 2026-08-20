import * as RoomManager from "../services/roomManager.js";
import User from "../models/User.js";
import crypto from "crypto";
import { getAuth } from "@clerk/express";

/**
 * @desc    Create a new collaborative room
 * @route   POST /api/rooms
 * @access  Private
 *
 * Room data is stored in Redis (ephemeral).
 * User lookup still uses MongoDB (persistent Clerk sync data).
 */
export const createRoom = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const ownerClerkId = auth.userId || req.body?.ownerClerkId;
    if (!ownerClerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name, language, privacy } = req.body;

    // Verify or find user in MongoDB via their Clerk ID
    let user = await User.findOne({ clerkId: ownerClerkId });
    if (!user) {
      user = await User.create({
        clerkId: ownerClerkId,
        email: req.body?.email || "",
        firstName: req.body?.firstName || "Developer",
      }).catch(() => null);
    }

    // Generate a URL-safe room ID (6 chars, cryptographically random)
    const roomId = crypto.randomBytes(4).toString("hex").slice(0, 6);

    // Store room metadata in Redis
    await RoomManager.createRoom(roomId, {
      name,
      language: language || "javascript",
      privacy: privacy || "public",
      ownerId: ownerClerkId,
    });

    res.status(201).json({
      success: true,
      data: {
        roomId,
        name,
        language: language || "javascript",
        privacy: privacy || "public",
        ownerId: ownerClerkId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a room by its ID
 * @route   GET /api/rooms/:roomId
 * @access  Public / Private
 *
 * Fetches room metadata from Redis.
 */
export const getRoomById = async (req, res, next) => {
  try {
    const room = await RoomManager.getRoom(req.params.roomId);

    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all rooms shared with a specific user
 * @route   GET /api/rooms/shared/:clerkId
 * @access  Private
 *
 * With ephemeral Redis rooms, persistent "shared rooms" don't apply.
 * Returns an empty array to keep the frontend route from breaking.
 */
export const getSharedRooms = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const clerkId = auth.userId || req.params.clerkId;
    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get real-time room & collaborator statistics from Redis
 * @route   GET /api/rooms/stats/live
 * @access  Public
 */
export const getRoomStats = async (req, res, next) => {
  try {
    const activeRooms = await RoomManager.getActiveRoomCount();
    const activeCollaborators = await RoomManager.getActiveCollaboratorCount();

    res.status(200).json({
      success: true,
      data: {
        activeRooms,
        activeCollaborators,
      },
    });
  } catch (error) {
    next(error);
  }
};
