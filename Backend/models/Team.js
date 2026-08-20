import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    ownerClerkId: {
      type: String,
      required: true,
    },
    members: [
      {
        clerkId: { type: String, required: true },
        name: { type: String, default: "Developer" },
        avatar: { type: String, default: "" },
        role: { type: String, default: "Member" },
      },
    ],
    rooms: [
      {
        roomId: { type: String, required: true },
        name: { type: String, required: true },
        language: { type: String, default: "javascript" },
        createdBy: { type: String, default: "Team Member" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
