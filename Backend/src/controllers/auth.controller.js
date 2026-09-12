const authService = require('../services/auth.service');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: Number(process.env.COOKIE_MAX_AGE_DAYS || 7) * 24 * 60 * 60 * 1000,
};

// Register: call register service, set token as HttpOnly cookie, return message
const register = async (req, res, next) => {
  try {
    const { token, ...body } = await authService.register(req.body);
    res.cookie('token', token, cookieOptions);
    res.status(201).json({ status: 'success', ...body });
  } catch (err) {
    next(err);
  }
};

// Login: call login service, set token as HttpOnly cookie, return message
const login = async (req, res, next) => {
  try {
    const { token, ...body } = await authService.login(req.body);
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ status: 'success', ...body });
  } catch (err) {
    next(err);
  }
};

// Logout: clear HttpOnly cookie, return message
const logout = (_req, res, next) => {
  try {
    const body = authService.logout();
    res.cookie('token', '', {
      ...cookieOptions,
      maxAge: 0,
      expires: new Date(0),
    });
    res.status(200).json({ status: 'success', ...body });
  } catch (err) {
    next(err);
  }
};

// Get current logged-in user from req.user (set by protect middleware)
const getMe = (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: req.user });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body);
    res.status(200).json({ status: 'success', ...result });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.status(200).json({ status: 'success', ...result });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, getMe, forgotPassword, resetPassword };
