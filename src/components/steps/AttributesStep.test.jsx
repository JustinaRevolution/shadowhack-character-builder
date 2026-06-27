import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AttributesStep from './AttributesStep'

const blank = { STR: null, DEX: null, CON: null, INT: null, WIS: null, CHA: null }
const partial = { STR: 3, DEX: 3, CON: 2, INT: null, WIS: null, CHA: null }

test('renders all six stat labels', () => {
  render(<AttributesStep attributes={blank} onAttributeChange={() => {}} hp={8} ac={10} karma={6} />)
  expect(screen.getByText('STR')).toBeInTheDocument()
  expect(screen.getByText('DEX')).toBeInTheDocument()
  expect(screen.getByText('CHA')).toBeInTheDocument()
})

test('shows remaining pool values', () => {
  render(<AttributesStep attributes={blank} onAttributeChange={() => {}} hp={8} ac={10} karma={6} />)
  expect(screen.getByText('Remaining: +3, +3, +2, +1, +0, -1')).toBeInTheDocument()
})

test('shows reduced pool after some assignments', () => {
  render(<AttributesStep attributes={partial} onAttributeChange={() => {}} hp={8} ac={10} karma={6} />)
  expect(screen.getByText('Remaining: +1, +0, -1')).toBeInTheDocument()
})

test('shows derived stats', () => {
  render(<AttributesStep attributes={blank} onAttributeChange={() => {}} hp={8} ac={10} karma={6} />)
  expect(screen.getByText('8')).toBeInTheDocument()
  expect(screen.getByText('6')).toBeInTheDocument()
})
