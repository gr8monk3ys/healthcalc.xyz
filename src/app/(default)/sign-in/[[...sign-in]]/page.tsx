import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { clerkEnabled, getClerkEnvState } from '@/utils/auth';

export default function SignInPage() {
  if (!clerkEnabled) {
    const authState = getClerkEnvState();
    const message =
      authState.issue === 'test_publishable_key_in_production' ||
      authState.issue === 'test_secret_key_in_production'
        ? 'Authentication is temporarily unavailable because production Clerk keys are not configured yet.'
        : 'Authentication is temporarily unavailable while environment variables are being finalized.';

    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <h1 className="mb-2 text-2xl font-bold">Sign in unavailable</h1>
        <p className="text-gray-600">{message}</p>
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
