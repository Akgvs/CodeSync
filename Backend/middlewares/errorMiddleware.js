/**
 * Catch-all middleware for 404 Not Found errors.
 * DRY principle: Handles any undefined routes in a single place.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler middleware.
 * SOLID principle: Centralized responsibility for formatting and returning errors.
 */
export const errorHandler = (err, req, res, next) => {
  // If the status code is 200, but we hit the error handler, it's a 500 server error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
