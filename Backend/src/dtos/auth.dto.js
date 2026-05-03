// Register response — token sent via HttpOnly cookie, not in body
const registerResponseDto = () => ({
  message: 'Account created successfully',
});

// Login response — token sent via HttpOnly cookie, not in body
const loginResponseDto = () => ({
  message: 'Logged in successfully',
});

// Logout response — confirms session cleared
const logoutResponseDto = () => ({
  message: 'Logged out successfully',
});

const forgotPasswordResponseDto = () => ({
  success: true,
  message: 'If account exists, OTP sent successfully',
});

const resetPasswordResponseDto = () => ({
  message: 'Password reset successfully',
});

module.exports = { registerResponseDto, loginResponseDto, logoutResponseDto, forgotPasswordResponseDto, resetPasswordResponseDto };
