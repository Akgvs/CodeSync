import express from "express";
import {
  createTeam,
  getTeams,
  addTeamRoom,
  joinTeam,
  deleteTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.route("/").post(createTeam).get(getTeams);
router.route("/:teamId/rooms").post(addTeamRoom);
router.route("/:teamId/join").post(joinTeam);
router.route("/:teamId").delete(deleteTeam);

export default router;
