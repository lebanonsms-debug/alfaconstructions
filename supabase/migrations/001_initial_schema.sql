-- ALFA CONSTRUCTION - Database Schema
-- Migrations by Solar Mini4

-- ============================================================
-- 1. Profiles table (user profiles)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('administrator', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- ============================================================
-- 2. Site settings
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL DEFAULT 'ALFA CONSTRUCTION',
    logo_path TEXT,
    contact_person TEXT NOT NULL DEFAULT 'Ali Safa',
    job_title TEXT NOT NULL DEFAULT 'Président Directeur Général',
    email_primary TEXT NOT NULL DEFAULT 'ali-safa@alfa-constructions.com',
    email_additional TEXT,
    phone TEXT NOT NULL DEFAULT '+242 06 822 22 20',
    address TEXT NOT NULL DEFAULT 'Avenue Docteur Cardorelle, Songolo, Centre-Ville, Boulevard Charles de Gaulle, Immeuble Hôtel Elaïs, République du Congo',
    website TEXT NOT NULL DEFAULT 'www.alfa-constructions.com',
    social_links TEXT DEFAULT '',
    business_hours TEXT,
    homepage_content TEXT,
    footer_content TEXT,
    seo_defaults TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. Project categories (services)
-- ============================================================
CREATE TABLE IF NOT EXISTS project_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    image_path TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. Projects
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    category_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
    cover_image_path TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    start_date TEXT,
    completion_date TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- ============================================================
-- 5. Project images
-- ============================================================
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    caption TEXT,
    alt_text TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);

-- ============================================================
-- 6. Services
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image_path TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);

-- ============================================================
-- 7. Contact messages
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Nouveau' CHECK (status IN ('Nouveau', 'En cours', 'En attente', 'Traité', 'Archivé')),
    source_ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- ============================================================
-- 8. Quotation requests
-- ============================================================
CREATE TABLE IF NOT EXISTS quotation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
    project_location TEXT NOT NULL,
    project_description TEXT NOT NULL,
    estimated_budget TEXT,
    desired_start_date TEXT,
    status TEXT NOT NULL DEFAULT 'Nouveau' CHECK (status IN ('Nouveau', 'En cours', 'En attente', 'Traité', 'Archivé')),
    source_ip TEXT,
    user_agent TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_requests_status ON quotation_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotation_requests_email ON quotation_requests(email);

-- ============================================================
-- 9. Audit logs
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- Profiles policies
-- ==========================================
CREATE POLICY "Public read profiles disabled" ON profiles
    FOR SELECT USING (false);

CREATE POLICY "Admins and editors can insert profiles"
    ON profiles FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "User can update own profile"
    ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users cannot delete profiles"
    ON profiles FOR DELETE USING (false);

-- ==========================================
-- Site settings policies
-- ==========================================
CREATE POLICY "Admins can read site settings"
    ON site_settings FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can modify site settings"
    ON site_settings FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

-- ==========================================
-- Project categories policies
-- ==========================================
CREATE POLICY "Public read categories" ON project_categories
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins and editors can insert categories"
    ON project_categories FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can update categories"
    ON project_categories FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can delete categories"
    ON project_categories FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

-- ==========================================
-- Projects policies
-- ==========================================
CREATE POLICY "Public read published projects" ON projects
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins and editors can insert projects"
    ON projects FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can update projects"
    ON projects FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can delete projects"
    ON projects FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

-- ==========================================
-- Project images policies
-- ==========================================
CREATE POLICY "Public read published project images" ON project_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_images.project_id
            AND projects.status = 'published'
        )
    );

CREATE POLICY "Admins and editors can insert images"
    ON project_images FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can update images"
    ON project_images FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can delete images"
    ON project_images FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

-- ==========================================
-- Services policies
-- ==========================================
CREATE POLICY "Public read published services" ON services
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins and editors can insert services"
    ON services FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can update services"
    ON services FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins and editors can delete services"
    ON services FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

-- ==========================================
-- Contact messages policies
-- ==========================================
CREATE POLICY "Public can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Only admins can read contact messages" ON contact_messages
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can update contact messages" ON contact_messages
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can delete contact messages" ON contact_messages
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

-- ==========================================
-- Quotation requests policies
-- ==========================================
CREATE POLICY "Public can insert quotation requests" ON quotation_requests
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Only admins can read quotations" ON quotation_requests
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can update quotations" ON quotation_requests
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can delete quotations" ON quotation_requests
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

-- ==========================================
-- Audit logs policies
-- ==========================================
CREATE POLICY "Only admins can read audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

CREATE POLICY "Only admins can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'administrator')
    );

-- Storage policies
-- ==========================================
-- Create storage buckets
INSERT INTO supabase_functions.metadata (name, version, body)
VALUES ('storage_buckets', '1.0', $$
-- Create public bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('alfaconstructions-public', 'alfaconstructions-public', true);

-- Create private bucket for uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('alfaconstructions-uploads', 'alfaconstructions-uploads', false);

-- Storage policies for public project imagery
CREATE POLICY "Public read project images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'alfaconstructions-public');

CREATE POLICY "Admins can upload project images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'alfaconstructions-public'
        AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('administrator', 'editor'))
    );

CREATE POLICY "Admins can update project images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'alfaconstructions-public')
    WITH CHECK (bucket_id = 'alfaconstructions-public');

CREATE POLICY "Admins can delete project images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'alfaconstructions-public');
$$);
