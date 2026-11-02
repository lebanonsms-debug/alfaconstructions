import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'

describe('Home page', () => {
  it('renders the homepage', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    expect(document.body).toBeTruthy()
  })
})
