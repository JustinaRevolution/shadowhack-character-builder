import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RoleStep from './RoleStep'

const roles = [
  { name: 'Faceman', karma_cost: 2, passive: false, description: 'Pass charm tests.' },
  { name: 'Lie Detector', karma_cost: 0, passive: true, description: 'Always know lies.' },
]

test('renders all role cards', () => {
  render(<RoleStep roles={roles} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Faceman')).toBeInTheDocument()
  expect(screen.getByText('Lie Detector')).toBeInTheDocument()
})

test('shows passive label for passive roles', () => {
  render(<RoleStep roles={roles} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Passive')).toBeInTheDocument()
})

test('calls onSelect when clicked', async () => {
  const fn = vi.fn()
  render(<RoleStep roles={roles} selected={null} onSelect={fn} />)
  await userEvent.click(screen.getByText('Faceman'))
  expect(fn).toHaveBeenCalledWith(roles[0])
})
