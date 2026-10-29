import { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  noNavbar?: boolean
  noFooter?: boolean
  theme?: 'light' | 'dark'
}

export function Layout({
  children,
  title = 'ALFA CONSTRUCTION',
  description = 'Entreprise de génie civil et de travaux publics au Congo.',
  noNavbar = false,
  noFooter = false,
  theme = 'light',
}: LayoutProps) {
  let pageTheme = ''
  if (theme === 'dark') {
    pageTheme = 'dark'
  }

  return (
    <div className={pageTheme}>
      <div className="min-h-screen flex flex-col bg-[#0A192F] text-white">
        {!noNavbar && <Navbar />}
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        {!noFooter && <Footer />}
      </div>
    </div>
  )
}
