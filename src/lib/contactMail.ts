export function getContactMailApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}
