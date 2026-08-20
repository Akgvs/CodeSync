import Team from "../models/Team.js";
import User from "../models/User.js";
import * as RoomManager from "../services/roomManager.js";
import crypto from "crypto";
import { getAuth } from "@clerk/express";

/**
 * @desc    Create a new team
 * @route   POST /api/teams
 * @access  Private
 */
export const createTeam = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const ownerClerkId = auth.userId || req.body?.ownerClerkId || `guest_${Date.now()}`;

    const { name, description } = req.body;
    const user = await User.findOne({ clerkId: ownerClerkId });

    const ownerName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(" ") || "Team Owner"
      : req.body?.ownerName || "Team Owner";
    const ownerAvatar = user?.avatarUrl || "";

    const teamId = `team_${crypto.randomBytes(4).toString("hex")}`;

    const team = await Team.create({
      teamId,
      name,
      description: description || "Collaborative development team",
      ownerClerkId,
      members: [
        {
          clerkId: ownerClerkId,
          name: ownerName,
          avatar: ownerAvatar,
          role: "Owner",
        },
      ],
      rooms: [],
    });

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all teams for the authenticated user
 * @route   GET /api/teams
 * @access  Private / Public fallback
 */
export const getTeams = async (req, res, next) => {
  try {
    // Return all teams from MongoDB so all team members see all teams and common rooms
    const teams = await Team.find().sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a common room to a team
 * @route   POST /api/teams/:teamId/rooms
 * @access  Private
 */
export const addTeamRoom = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { name, language } = req.body;
    const auth = getAuth(req);
    const creatorClerkId = auth.userId || req.body?.ownerClerkId || "guest";

    const team = await Team.findOne({ teamId });
    if (!team) {
      res.status(404);
      throw new Error("Team not found");
    }

    const roomId = crypto.randomBytes(4).toString("hex").slice(0, 6);

    // Register room in Redis ephemeral store
    await RoomManager.createRoom(roomId, {
      name: `[${team.name}] ${name}`,
      language: language || "javascript",
      privacy: "public",
      ownerId: creatorClerkId || team.ownerClerkId,
    });

    const creatorUser = creatorClerkId ? await User.findOne({ clerkId: creatorClerkId }) : null;
    const creatorName = creatorUser
      ? [creatorUser.firstName, creatorUser.lastName].filter(Boolean).join(" ")
      : "Team Member";

    const newRoom = {
      roomId,
      name,
      language: language || "javascript",
      createdBy: creatorName,
      createdAt: new Date(),
    };

    team.rooms.unshift(newRoom);
    await team.save();

    res.status(201).json({
      success: true,
      data: {
        team,
        newRoom,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Join a team
 * @route   POST /api/teams/:teamId/join
 * @access  Private
 */
export const joinTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const auth = getAuth(req);
    const joiningClerkId = auth.userId || req.body?.clerkId || `guest_${Date.now()}`;

    const team = await Team.findOne({ teamId });
    if (!team) {
      res.status(404);
      throw new Error("Team not found");
    }

    const user = await User.findOne({ clerkId: joiningClerkId });
    const memberName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || req.body?.name || "Team Member";
    const memberAvatar = user?.avatarUrl || req.body?.avatar || "";

    const alreadyMember = team.members.some((m) => m.clerkId === joiningClerkId);
    if (!alreadyMember) {
      team.members.push({
        clerkId: joiningClerkId,
        name: memberName,
        avatar: memberAvatar,
        role: "Member",
      });
      await team.save();
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a team
 * @route   DELETE /api/teams/:teamId
 * @access  Private
 */
export const deleteTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    await Team.deleteOne({ teamId });

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
