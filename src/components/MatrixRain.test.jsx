import { render } from '@testing-library/react'
import MatrixRain from './MatrixRain'

test('renders a canvas element', () => {
  const { container } = render(<MatrixRain />)
  const canvas = container.querySelector('canvas')
  expect(canvas).toBeInTheDocument()
})

test('canvas has fixed positioning class', () => {
  const { container } = render(<MatrixRain />)
  const canvas = container.querySelector('canvas')
  expect(canvas.className).toContain('fixed')
})
