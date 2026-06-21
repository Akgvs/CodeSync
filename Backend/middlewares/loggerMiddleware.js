/**
 * Simple request logger middleware.
 * SOLID principle: Single responsibility of logging incoming API requests.
 */
export const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
