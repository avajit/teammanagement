'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@workspace/ui/components/button';
import useAuth from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { loading, error } = useAuthContext();
  const { forgot } = useAuth();

  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');
    setOtp('');

    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }

    try {
      const res = await forgot({ email });
      setSuccess('We have sent a 6-digit OTP to your email. Please check your email inbox or your terminal console.');
      if (res.otp) {
        setOtp(res.otp);
      }
    } catch (err) {
      // Handled by the useAuth hook and auth context
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="mb-1 text-2xl font-semibold text-foreground">Forgot Password</h1>
        <p className="mb-6 text-sm text-muted-foreground">Enter your email address to receive a password reset OTP</p>

        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>

            {(error || localError) && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error || localError}
              </p>
            )}

            <Button type="submit" className="mt-1 w-full" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400">
              {success}
            </p>

            {otp && (
              <div className="rounded-lg border border-border bg-muted p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Your 6-Digit OTP</p>
                <p className="text-3xl font-bold tracking-widest text-foreground my-2">{otp}</p>
                <p className="text-xs text-muted-foreground">Valid for 10 minutes</p>
              </div>
            )}

            <Button onClick={() => router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`)} className="mt-1 w-full">
              Reset Password →
            </Button>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link href="/login" className="text-foreground underline underline-offset-4 hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
