'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { registerUser, loginUser, logoutUser, getMe } from '../services/auth.service';
import { validateRegister, validateLogin } from '../lib/validators/auth.validator';
import handleError from '../lib/utils/handleError';

const useAuth = () => {
  const { setUser, setLoading, setError, clearError } = useAuthContext();
  const router = useRouter();

  // Register: validate → call service → redirect to dashboard
  const register = async (formData) => {
    clearError();
    const validationError = validateRegister(formData);
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      const res = await registerUser(formData);
      setUser(res.user || (res.data && res.data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  // Login: validate → call service → redirect to dashboard
  const login = async (formData) => {
    clearError();
    const validationError = validateLogin(formData);
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      const res = await loginUser(formData);
      setUser(res.user || (res.data && res.data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  // Logout: call service → clear user → redirect to login
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser().catch(() => {});
    } finally {
      setUser(null);
      setLoading(false);
      window.location.href = '/login';
    }
  };

  const forgot = async (formData) => {
    clearError();
    try {
      setLoading(true);
      const { forgotPassword } = await import('../services/auth.service');
      const res = await forgotPassword(formData);
      return res;
    } catch (err) {
      setError(handleError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = async (formData) => {
    clearError();
    try {
      setLoading(true);
      const { resetPassword } = await import('../services/auth.service');
      const res = await resetPassword(formData);
      return res;
    } catch (err) {
      setError(handleError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, logout, forgot, reset };
};

export default useAuth;
