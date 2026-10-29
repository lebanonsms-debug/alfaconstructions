// Core application types

// ---- Prisma / DB types (mirror Supabase) ----

export type Currency = 'XAF' | 'EUR' | 'USD'

export interface ContactMessage {
  id: string
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'Nouveau' | 'En cours' | 'En attente' | 'Traité' | 'Archivé'
  created_at: string
  updated_at: string
}

export interface QuotationRequest {
  id: string
  name: string
  company: string
  email: string
  phone: string
  service_id: string | null
  project_location: string
  project_description: string
  estimated_budget: string | null
  desired_start_date: string | null
  status: 'Nouveau' | 'En cours' | 'En attente' | 'Traité' | 'Archivé'
  created_at: string
  updated_at: string
  internal_notes: string
}

export type DashboardStatus =
  | 'draft'
  | 'published'
  | 'archived'
  | 'all'

export interface Project {
  id: string
  title: string
  slug: string
  short_description: string
  description: string
  location: string
  category_id: string | null
  cover_image_path: string | null
  status: 'draft' | 'published' | 'archived'
  start_date: string | null
  completion_date: string | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
  published_at: string | null
  created_by: string | null
}

export interface ProjectImage {
  id: string
  project_id: string
  storage_path: string
  caption: string
  alt_text: string
  display_order: number
  created_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  description: string
  image_path: string | null
  display_order: number
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  company_name: string
  logo_path: string | null
  contact_person: string
  job_title: string
  email_primary: string
  email_additional: string | null
  phone: string
  address: string
  website: string
  social_links: string
  business_hours: string | null
  homepage_content: string
  footer_content: string
  seo_defaults: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id: string | null
  user_id: string | null
  changes: string | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  display_name: string
  role: 'administrator' | 'editor'
  created_at: string
  updated_at: string
}

export interface Language {
  code: 'fr' | 'en'
  label: string
  hreflang: string
}

// ---- UI types ----

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface FormErrors {
  [key: string]: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export interface FileUpload {
  id: string
  path: string
  filename: string
  url: string
  mime_type: string
  size: number
  created_at: string
  width?: number
  height?: number
}
