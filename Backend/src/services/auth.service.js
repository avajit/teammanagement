const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const { generateToken } = require('../utils/jwt');
const { registerResponseDto, loginResponseDto, logoutResponseDto, forgotPasswordResponseDto, resetPasswordResponseDto } = require('../dtos/auth.dto');

// Register: validate uniqueness, hash password, save user, return token + message
const register = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('Email is already registered', 409);

  const hashed = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return { token: generateToken(user.id), user: { id: user.id, name: user.name, email: user.email }, ...registerResponseDto() };
};

// Login: verify email exists, compare password, return token + message
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('Email does not exist', 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Incorrect password', 401);

  return { token: generateToken(user.id), user: { id: user.id, name: user.name, email: user.email }, ...loginResponseDto() };
};

// Logout: no DB operation needed — cookie cleared by controller
const logout = () => logoutResponseDto();

const { generateOtp, hashOtp, verifyOtp, sendOtpEmail } = require('../otp/otp.service');

const forgotPassword = async ({ email }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Email does not exist', 404);
  }

  // Generate 6-digit OTP
  const otp = generateOtp();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

  // Hash OTP before storing
  const hashedOtp = await hashOtp(otp);

  await prisma.user.update({
    where: { id: user.id },
    data: { resetOtp: hashedOtp, resetOtpExpiry: expiry },
  });

  // Send the OTP via Gmail SMTP exactly using Template
  await sendOtpEmail(email, otp);

  return forgotPasswordResponseDto();
};

const resetPassword = async ({ email, otp, newPassword }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('Invalid or expired OTP', 400);

  if (!user.resetOtp) {
    throw new AppError('Invalid or expired OTP', 400);
  }

  if (user.resetOtpExpiry && new Date() > new Date(user.resetOtpExpiry)) {
    throw new AppError('Invalid or expired OTP', 400);
  }

  // Verify the hashed OTP
  const isOtpMatch = await verifyOtp(otp, user.resetOtp);
  if (!isOtpMatch) {
    throw new AppError('Invalid or expired OTP', 400);
  }

  const hashed = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetOtp: null,
      resetOtpExpiry: null,
    },
  });

  return resetPasswordResponseDto();
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
