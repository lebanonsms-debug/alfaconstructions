// ---- Safe storage key access ----

import { z } from 'zod'

export const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().startsWith('sb_publishable_'),
})

export type Env = z.infer<typeof envSchema>

export function getEnv(): Env {
  const result = envSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  })

  if (!result.success) {
    console.warn('Invalid environment variables:', result.error.flatten())
  }

  return result.data!
}
