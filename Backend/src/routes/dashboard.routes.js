const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/dashboard/stats
router.get('/stats', protect, getStats);

module.exports = router;
