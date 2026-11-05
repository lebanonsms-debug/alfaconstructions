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
  showCtaStrip?: boolean
}

export function Layout({
  children,
  title = 'ALFA CONSTRUCTION',
  description = 'Entreprise de génie civil et de travaux publics au Congo.',
  noNavbar = false,
  noFooter = false,
  theme = 'light',
  showCtaStrip = true,
}: LayoutProps) {
  let pageTheme = ''
  if (theme === 'dark') {
    pageTheme = 'dark'
  }

  return (
    <div className={pageTheme}>
      <div className={pageTheme}>
        {!noNavbar && <Navbar />}
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        {!noFooter && <Footer showCtaStrip={showCtaStrip} />}
      </div>
    </div>
  )
}
