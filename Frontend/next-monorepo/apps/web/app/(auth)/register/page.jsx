import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <RegisterForm />
    </main>
  );
}
