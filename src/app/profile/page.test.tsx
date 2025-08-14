// Page.test.tsx
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page Component', () => {
  it('should render without errors', () => {
    expect(() => {
      render(<Page />)
    }).not.toThrow()
  })

  it('should render the ProfilePage component', () => {
    render(<Page />)
    expect(screen.getByTestId('profile-page')).toBeInTheDocument()
  })
})
