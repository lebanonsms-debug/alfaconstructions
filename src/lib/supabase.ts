// ---- Supabase client ----

import { createClient } from '@supabase/supabase-js'

// Environment variables are required for the build to succeed
// Do not commit .env files with secrets
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for Supabase Edge Functions and server routes)
export function createSupabaseServerClient() {
  // This is a placeholder for server-side usage
  // In a Node/Edge runtime environment, use @supabase/supabase-js directly
  // with a service-role key (never expose this to the client)
  throw new Error(
    'Server-side Supabase client not configured. Use Supabase Edge Functions or Vercel Server Actions with a service-role key.'
  )
}

// ---- Form helpers ----

import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, 'Le sujet est requis').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions de confidentialité',
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const quotationFormSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().max(30).optional(),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  projectLocation: z.string().min(3, 'La localisation du projet est requise').max(200),
  projectDescription: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(5000),
  estimatedBudget: z.string().max(50).optional(),
  desiredStartDate: z.string().max(50).optional(),
  documentUploads: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number(),
        mimeType: z.string(),
      })
    )
    .optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions de confidentialité',
  }),
})

export type QuotationFormValues = z.infer<typeof quotationFormSchema>

// ---- API response helpers ----

export function isApiSuccess<T>(response: Response): response is Response {
  return response.ok
}

export async function fetchWithRetry<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries = 3
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(input, init)
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          errorData?.message || `HTTP ${response.status}: ${response.statusText}`
        )
      }
      return (await response.json()) as T
    } catch (error) {
      lastError = error as Error
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)))
      }
    }
  }

  throw lastError!
}
