import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactStep from './ContactStep'

const contacts = [
  { name: 'Fixer', description: 'Gets you weapons and supplies.' },
  { name: 'Hacker', description: 'Gets you into secure areas.' },
]

test('renders all contact cards', () => {
  render(<ContactStep contacts={contacts} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Fixer')).toBeInTheDocument()
  expect(screen.getByText('Hacker')).toBeInTheDocument()
})

test('calls onSelect when clicked', async () => {
  const fn = vi.fn()
  render(<ContactStep contacts={contacts} selected={null} onSelect={fn} />)
  await userEvent.click(screen.getByText('Fixer'))
  expect(fn).toHaveBeenCalledWith(contacts[0])
})
