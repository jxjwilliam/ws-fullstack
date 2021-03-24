import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

test('Test App', () => {
  render(
    <Router>
      <App />
    </Router>,
  )
  const linkElement = screen.getByTitle(/Description/)
  expect(linkElement).toBeInTheDocument()
})
