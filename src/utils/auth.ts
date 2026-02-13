export type ClerkConfigIssue =
  | 'missing_keys'
  | 'missing_secret_key'
  | 'test_publishable_key_in_production'
  | 'test_secret_key_in_production'
  | null;

export interface ClerkEnvState {
  enabled: boolean;
  publishableKeyConfigured: boolean;
  secretKeyConfigured: boolean;
  productionKeysValid: boolean;
  issue: ClerkConfigIssue;
}

function isProductionEnvironment(env: string | undefined): boolean {
  return env?.trim().toLowerCase() === 'production';
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function isTestPublishableKey(value: string): boolean {
  return value.startsWith('pk_test_');
}

function isTestSecretKey(value: string): boolean {
  return value.startsWith('sk_test_');
}

function isLivePublishableKey(value: string): boolean {
  return value.startsWith('pk_live_');
}

function isLiveSecretKey(value: string): boolean {
  return value.startsWith('sk_live_');
}

export function getClerkEnvState(env: NodeJS.ProcessEnv = process.env): ClerkEnvState {
  const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? '';
  const secretKey = env.CLERK_SECRET_KEY?.trim() ?? '';
  const production = isProductionEnvironment(env.NODE_ENV);

  const publishableKeyConfigured = hasValue(publishableKey);
  const secretKeyConfigured = hasValue(secretKey);

  if (!publishableKeyConfigured && !secretKeyConfigured) {
    return {
      enabled: false,
      publishableKeyConfigured: false,
      secretKeyConfigured: false,
      productionKeysValid: true,
      issue: 'missing_keys',
    };
  }

  if (publishableKeyConfigured && !secretKeyConfigured) {
    return {
      enabled: false,
      publishableKeyConfigured: true,
      secretKeyConfigured: false,
      productionKeysValid: !production || isLivePublishableKey(publishableKey),
      issue: 'missing_secret_key',
    };
  }

  const publishableLooksLive = isLivePublishableKey(publishableKey);
  const secretLooksLive = isLiveSecretKey(secretKey);
  const publishableLooksTest = isTestPublishableKey(publishableKey);
  const secretLooksTest = isTestSecretKey(secretKey);

  if (production && publishableLooksTest) {
    return {
      enabled: false,
      publishableKeyConfigured: true,
      secretKeyConfigured: true,
      productionKeysValid: false,
      issue: 'test_publishable_key_in_production',
    };
  }

  if (production && secretLooksTest) {
    return {
      enabled: false,
      publishableKeyConfigured: true,
      secretKeyConfigured: true,
      productionKeysValid: false,
      issue: 'test_secret_key_in_production',
    };
  }

  const productionKeysValid = !production || (publishableLooksLive && secretLooksLive);

  return {
    enabled: publishableKeyConfigured && secretKeyConfigured && productionKeysValid,
    publishableKeyConfigured,
    secretKeyConfigured,
    productionKeysValid,
    issue: null,
  };
}

const clerkEnvState = getClerkEnvState();

export const clerkEnabled = clerkEnvState.enabled;
