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

export interface CmsPage {
  id: string
  slug: string
  title_fr: string
  title_en: string
  description_fr?: string
  description_en?: string
  status: 'draft' | 'published' | 'archived'
  display_order: number
  created_at: string
  updated_at: string
}

export interface CmsSection {
  id: string
  page_id: string
  title_fr?: string
  title_en?: string
  content_fr?: string
  content_en?: string
  section_type: string
  display_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface CmsCategory {
  id: string
  slug: string
  name_fr: string
  name_en: string
  description_fr?: string
  description_en?: string
  image_path?: string
  display_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface CmsMedia {
  id: string
  storage_path: string
  file_name: string
  file_type?: string
  file_size?: number
  caption_fr?: string
  caption_en?: string
  alt_text_fr?: string
  alt_text_en?: string
  category: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface CmsSetting {
  id: string
  key: string
  value?: string
  value_type: string
  group_name: string
  updated_at: string
}

export interface CmsContentBlock {
  id: string
  block_key: string
  content_fr?: string
  content_en?: string
  block_type: string
  updated_at: string
}

export interface CmsHeroSlide {
  id: string
  title_fr: string
  title_en: string
  description_fr: string
  description_en: string
  image_url: string
  video_url?: string
  display_order: number
  visible: boolean
  created_at: string
  updated_at: string
}
