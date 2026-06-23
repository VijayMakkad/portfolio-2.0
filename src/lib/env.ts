const getEnv = (key: string): string | undefined => process.env[key];

export const env = {
  baseUrl: getEnv('NEXT_PUBLIC_BASE_URL') ?? 'http://localhost:3000',
  geminiApiKey: getEnv('GEMINI_API_KEY'),
  resendApiKey: getEnv('RESEND_API_KEY'),
  contactToEmail: getEnv('CONTACT_TO_EMAIL'),
  contactFromEmail: getEnv('CONTACT_FROM_EMAIL') ?? 'onboarding@resend.dev',
} as const;

export function isGeminiConfigured(): boolean {
  return Boolean(env.geminiApiKey);
}

export function isContactConfigured(): boolean {
  return Boolean(env.resendApiKey && env.contactToEmail);
}
