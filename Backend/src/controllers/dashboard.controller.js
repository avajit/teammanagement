const dashboardService = require('../services/dashboard.service');

// Return aggregated stats for the dashboard
const getStats = async (req, res, next) => {
  try {
    const data = await dashboardService.getStats(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
