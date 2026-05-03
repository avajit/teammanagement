import LoginForm from '@/components/auth/LoginForm';

export const metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <LoginForm />
    </main>
  );
}
