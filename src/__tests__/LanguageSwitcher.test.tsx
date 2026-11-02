import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'
import LanguageSwitcher from '@/components/LanguageSwitcher'

describe('LanguageSwitcher', () => {
  it('switches language when clicked', async () => {
    i18n.changeLanguage('fr')
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', { name: /switch language/i })
    expect(btn).toBeTruthy()
    fireEvent.click(btn)
    await waitFor(() => {
      expect(i18n.language).toBe('en')
    })
  })
})
