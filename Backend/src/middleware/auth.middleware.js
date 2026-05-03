const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');
const prisma = require('../lib/prisma');

// Protect routes: read token from HttpOnly cookie, verify, attach user to req.user
const protect = async (req, _res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) return next(new AppError('Access denied. Please log in.', 401));

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) return next(new AppError('User no longer exists.', 401));

    req.user = user;
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token. Please log in again.', 401));
  }
};

module.exports = { protect };
