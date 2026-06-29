import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackgroundStep from './BackgroundStep'

const backgrounds = [
  { id: 1, name: 'Military', description: 'Combat tactics advantage.' },
  { id: 2, name: 'Medicine', description: 'Medical tests advantage.' },
]

test('renders all background cards', () => {
  render(<BackgroundStep backgrounds={backgrounds} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Military')).toBeInTheDocument()
  expect(screen.getByText('Medicine')).toBeInTheDocument()
})

test('calls onSelect with background object when clicked', async () => {
  const fn = vi.fn()
  render(<BackgroundStep backgrounds={backgrounds} selected={null} onSelect={fn} />)
  await userEvent.click(screen.getByText('Military'))
  expect(fn).toHaveBeenCalledWith(backgrounds[0])
})

test('highlights selected background', () => {
  render(<BackgroundStep backgrounds={backgrounds} selected={backgrounds[0]} onSelect={() => {}} />)
  expect(screen.getByText('Military').closest('button')).toHaveClass('border-[#00ff41]')
})
