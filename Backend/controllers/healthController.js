/**
 * @desc    Get API Status
 * @route   GET /
 * @access  Public
 */
export const getApiStatus = (req, res) => {
  res.status(200).json({
    message: "CodeSync API Running",
    success: true,
  });
};

/**
 * @desc    Check API Health
 * @route   GET /health
 * @access  Public
 */
export const checkHealth = (req, res) => {
  res.status(200).json({
    message: "ok",
    success: true,
  });
};
