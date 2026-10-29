import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ---- Utility function for conditional class names ----

export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(clsx(...classes))
}

export function getProjectImageUrl(path: string, width = 800): string {
  if (!path) return ''
  // Supabase Storage paths are already public URLs for published projects
  // If using authenticated uploads, this would need to be a signed URL
  if (path.startsWith('http')) return path
  // For local development or cached images
  return `${path}?w=${width}&q=80`
}

export function getStorageBaseUrl(): string | null {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_SUPABASE_URL
  }
  return import.meta.env.VITE_SUPABASE_URL
}

// ---- Slug helpers ----

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àâæçéèêëîïôœùûüÿý]/g, (c) => {
      const map: Record<string, string> = {
        à: 'a',
        â: 'a',
        æ: 'ae',
        ç: 'c',
        é: 'e',
        è: 'e',
        ê: 'e',
        ë: 'e',
        î: 'i',
        ï: 'i',
        ô: 'o',
        œ: 'oe',
        ù: 'u',
        û: 'u',
        ü: 'u',
        ÿ: 'y',
        ý: 'y',
      }
      return map[c] || c
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+g/, '')
}

export function generateSlug(base: string, existingSlugs: string[]): string {
  let slug = slugify(base)
  let finalSlug = slug
  let counter = 1

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${slug}-${counter}`
    counter++
  }

  return finalSlug
}
