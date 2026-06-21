/**
 * Middleware to bypass Clerk authentication in development/testing environments.
 * If the header 'x-mock-clerk-id' is provided, we populate req.auth with it.
 */
export const mockAuthMiddleware = (req, res, next) => {
  const mockClerkId = req.headers["x-mock-clerk-id"];
  if (process.env.NODE_ENV !== "production" && mockClerkId) {
    req.auth = req.auth || {};
    req.auth.clerkId = mockClerkId;
    req.auth.userId = mockClerkId;
    console.log(`[Auth] Bypassing Clerk using mock clerkId: ${mockClerkId}`);
  }
  next();
};
