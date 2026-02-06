import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';

export default function SignInPage() {
  if (!clerkEnabled) {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <h1 className="mb-2 text-2xl font-bold">Sign in unavailable</h1>
        <p className="text-gray-600">Clerk environment variables are not configured yet.</p>
        <Link href="/" className="mt-4 inline-block text-accent hover:underline">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      <SignIn forceRedirectUrl="/" />
    </div>
  );
}
