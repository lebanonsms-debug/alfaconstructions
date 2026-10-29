# ALFA CONSTRUCTION Website

Professional corporate website for ALFA CONSTRUCTION, a construction, public works, transportation, logistics, and quarry operations company based in the Republic of the Congo.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4
- **Design System**: Custom (black/navy, gold accent, Inter font)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod + Vercel serverless functions
- **Hosting**: Vercel
- **Source Control**: GitHub
- **UI Components**: Custom reusable components
- **Icons**: Lucide React

## Project Structure

```
alfa-constructions/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── navbar/       # Navigation components
│   │   ├── footer/       # Footer components
│   │   └── layout/       # Layout components
│   ├── pages/            # Public pages
│   ├── admin/            # Admin dashboard
│   ├── config/           # Brand configuration
│   ├── lib/              # Utility functions
│   ├── hooks/            # React hooks
│   ├── types/            # TypeScript types
│   └── App.tsx           # Main app component
├── supabase/
│   ├── migrations/       # Database migrations
│   ├── functions/        # Supabase Edge Functions
│   └── schema.ts         # Database schema definition
├── vercel/
│   └── functions/        # Vercel serverless functions
├── public/               # Static assets
├── scripts/              # Build utility scripts
└── tests/                # Test files
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase project
- A Vercel account
- Git

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/lebanonsms-debug/alfaconstructions.git
   cd alfa-constructions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the following Environment Variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Plus any email provider secrets

4. Deploy!

### Vercel Functions

The contact form handler is deployed as a Vercel serverless function at `/api/contact`. Configure the following env vars:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `CONTACT_EMAIL` (if using email notifications)

## Supabase Setup

1. Create a new Supabase project
2. Run the migrations from `supabase/migrations/001_initial_schema.sql`
3. Create a storage bucket:
   - `alfaconstructions-public` (public, for published images)
   - `alfaconstructions-uploads` (private, for uploads)
4. Configure Row Level Security policies (already included in migrations)
5. Create an admin user via the Supabase dashboard

### Initial Admin Setup

1. Go to Supabase Dashboard > Authentication > Users
2. Create a new user or reset password
3. Then go to Dashboard > Auth > User Management and set the role in the `profiles` table
4. Or use the SQL editor:

```sql
-- Insert an admin profile
INSERT INTO profiles (id, display_name, role, created_at, updated_at)
VALUES (your-supabase-user-id, Ali
