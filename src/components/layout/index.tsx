import { ReactNode } from 'react'
import { ScrollProgress } from '@/components/animation'
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
  title = 'alfa CONSTRUCTION',
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
      <ScrollProgress />
      <div className={pageTheme}>
        {!noNavbar && <Navbar />}
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        {!noFooter && <Footer />}
      </div>
    </div>
  )
}
