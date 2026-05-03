// Must match backend validation rules exactly
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

export const validateRegister = ({ name, email, password }) => {
  if (!name || name.trim().length < 2)
    return 'Name must be at least 2 characters';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Enter a valid email address';

  if (!password || password.length < 6)
    return 'Password must be at least 6 characters';

  if (!SPECIAL_CHAR_REGEX.test(password))
    return 'Password must contain at least one special character';

  return null;
};

export const validateLogin = ({ email, password }) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Enter a valid email address';

  if (!password) return 'Password is required';

  return null;
};
