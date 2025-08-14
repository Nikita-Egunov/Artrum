// Page.test.tsx
import { render } from '@testing-library/react'
import Page from './page'


describe('Page Component', () => {
  it('should render without errors', () => {
    expect(() => {
      render(<Page />)
    }).not.toThrow()
  })

  it('should render the SignInPage component', () => {
    const { container } = render(<Page />)
    expect(container.querySelector('[data-testid="sign-in-page"]')).toBeInTheDocument()
  })
})
