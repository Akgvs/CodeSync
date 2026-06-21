import User from "../models/User.js";
import { getAuth } from "@clerk/express";

/**
 * @desc    Sync user data from Clerk (or create if doesn't exist)
 * @route   POST /api/users/sync
 * @access  Private
 */
export const syncUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);  //ClerkId named UserId in usercontroller (for consistency)

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { email, firstName, lastName, avatarUrl } = req.body;

    // Use the authenticated userId from the token to prevent spoofing
    const clerkId = userId;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        avatarUrl,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
