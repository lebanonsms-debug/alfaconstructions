import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Contact from '@/pages/Contact'

describe('Contact page', () => {
  it('renders contact form', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )
    expect(screen.getByLabelText(/nom complet/i)).toBeTruthy()
  })
})
