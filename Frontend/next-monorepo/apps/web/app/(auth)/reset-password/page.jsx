'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { useAuthContext } from '@/context/AuthContext';
import useAuth from '@/hooks/useAuth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error } = useAuthContext();
  const { reset } = useAuth();

  const [form, setForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email') || '';
    const otpParam = searchParams.get('otp') || '';
    setForm((prev) => ({
      ...prev,
      email: emailParam,
      otp: otpParam,
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (!form.email || !form.otp || !form.newPassword || !form.confirmPassword) {
      setLocalError('All fields are required');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await reset({
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      setSuccess('Your password has been reset successfully.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      // Handled by useAuth and auth context
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h1 className="mb-1 text-2xl font-semibold text-foreground">Reset Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">Enter your OTP and new password below</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">OTP</label>
          <input
            name="otp"
            type="text"
            placeholder="6-Digit OTP"
            value={form.otp}
            onChange={handleChange}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">New Password</label>
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Confirm New Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        {(error || localError) && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error || localError}
          </p>
        )}

        {success && (
          <p className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <Button type="submit" className="mt-1 w-full" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="text-foreground underline underline-offset-4 hover:opacity-80">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
