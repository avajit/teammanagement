const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');

// POST /api/auth/register
router.post('/register', registerValidator, validate, register);

// POST /api/auth/login
router.post('/login', loginValidator, validate, login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPasswordValidator, validate, resetPassword);

// POST /api/auth/logout
router.post('/logout', protect, logout);

// GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
