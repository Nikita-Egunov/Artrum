// Page.test.tsx
import { render, screen } from '@testing-library/react'
import Page from './page'


describe('Page Component', () => {
  it('should render without errors', () => {
    expect(() => {
      render(<Page />)
    }).not.toThrow()
  })

  it('should render the SignUpPage component', () => {
    render(<Page />)
    expect(screen.getByTestId('sign-up-page')).toBeInTheDocument()
  })
})
