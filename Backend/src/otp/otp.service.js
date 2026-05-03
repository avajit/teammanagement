const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

/**
 * Generate a 6-digit numeric OTP.
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Hash an OTP for secure storage.
 */
const hashOtp = async (otp) => {
  return await bcrypt.hash(otp, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
};

/**
 * Compare plain text OTP with hashed OTP.
 */
const verifyOtp = async (plainOtp, hashedOtp) => {
  return await bcrypt.compare(plainOtp, hashedOtp);
};

/**
 * Send the generated OTP via Gmail SMTP exactly using the required template.
 */
const sendOtpEmail = async (email, otp) => {
  return await sendEmail({
    to: email,
    subject: 'Reset Password OTP',
    text: `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`,
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP for password reset is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};

module.exports = {
  generateOtp,
  hashOtp,
  verifyOtp,
  sendOtpEmail,
};
