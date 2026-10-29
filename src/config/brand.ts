// ---- Brand constants ----

import { type Currency } from '@/types'

export const brand = {
  primary: '#0A192F',
  secondary: '#14263F',
  accent: '#D4AF37',
  gold: '#D4AF37',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#9CA3AF',
  darkGray: '#374151',
  text: '#1F2937',
  mutedText: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
} as const

export const colors = {
  background: brand.primary,
  surface: brand.secondary,
  surfaceLight: '#1A2D4A',
  text: brand.text,
  textSecondary: brand.mutedText,
  border: brand.border,
  accent: brand.gold,
  gold: brand.gold,
  white: brand.white,
  gray: brand.gray,
}

// ---- Typography ----

export const fontFamily = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
} as const

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
} as const

export const lineHeight = {
  tight: '1.1',
  snug: '1.2',
  normal: '1.5',
  relaxed: '1.6',
} as const

// ---- Spacing ----

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  '6xl': '4rem',
  '7xl': '5rem',
  '8xl': '6rem',
  '9xl': '8rem',
} as const

// ---- Animation timings ----

export const animation = {
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  slower: '600ms',
}

// ---- Component defaults ----

export const radius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const

// Currency options
export const currencies: Currency[] = ['XAF', 'EUR', 'USD']

// Business sectors
export interface Sector {
  id: string
  label: string
  labelEn: string
  description: string
  descriptionEn: string
  icon: string
}

export const sectors: Sector[] = [
  {
    id: 'batiments',
    label: 'Bâtiment & Travaux Publics',
    labelEn: 'Construction & Public Works',
    description:
      'Réalisation complète de projets de construction civile et travaux publics : terrassement, fondations, structures, drainage et infrastructure.',
    descriptionEn:
      'Full construction projects: civil engineering, earthworks, foundations, structures, drainage and infrastructure.',
    icon: 'building',
  },
  {
    id: 'transport',
    label: 'Transport & Logistique',
    labelEn: 'Transport & Logistics',
    description:
      'Transport de matériaux de construction, gestion logistique de sites, mobilier et équipements sur tout le territoire.',
    descriptionEn:
      'Construction material transport, site logistics coordination, equipment and fleet management.',
    icon: 'truck',
  },
  {
    id: 'carrieres',
    label: 'Exploitation de Carrières',
    labelEn: 'Quarry Operations',
    description:
      'Exploitation et gestion de carrières, approvisionnement en matériaux de construction, défrichage et production de granulats.',
    descriptionEn:
      'Quarry extraction, flow-management, supply of construction materials, clearing and aggregate production.',
    icon: 'mine',
  },
  {
    id: 'bureaudeetude',
    label: 'Bureau d\'Étude',
    labelEn: 'Engineering Services',
    description:
      'Études techniques, préparation des projets, études de faisabilité, planification et suivi d\'exécution.',
    descriptionEn:
      'Technical studies, project preparation, feasibility studies, engineering planning and execution oversight.',
    icon: 'gavel',
  },
]

export const navItems = [
  { label: 'Accueil', href: '/', icon: 'home' },
  { label: 'À Propos', href: '/apropos', icon: 'info' },
  { label: 'Nos Services', href: '/services', icon: 'services' },
  { label: 'Réalisations', href: '/realisations', icon: 'grid' },
  { label: 'Contact', href: '/contact', icon: 'mail' },
] as const

export const footerNavItems = [
  { label: 'Accueil', href: '/' },
  { label: 'À Propos', href: '/apropos' },
  { label: 'Nos Services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mentions Légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/politique-confidentialite' },
] as const

export const languages: { code: 'fr' | 'en'; label: string; hreflang: string }[] = [
  { code: 'fr', label: 'FR', hreflang: 'fr-FR' },
  { code: 'en', label: 'EN', hreflang: 'en-US' },
]

export const defaultSeo = {
  title: 'alfa CONSTRUCTION — Bâtiment, Travaux Publics, Transport & Logistique, Carrières',
  description:
    'alfa CONSTRUCTION est une entreprise de génie civil et de travaux publics basée à la République du Congo. Bâtiment, transport, logistique, exploitation de carrières et bureau d\'étude.',
  canonical: 'https://alfaconstructions.vercel.app',
}

export const defaultOgImage = 'https://alfaconstructions.vercel.app/og-image.png'
