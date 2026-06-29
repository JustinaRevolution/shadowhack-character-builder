import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NameStep from './NameStep'

test('renders name input', () => {
  render(<NameStep name="" playerName="" onNameChange={() => {}} onPlayerNameChange={() => {}} />)
  expect(screen.getByPlaceholderText('Enter character name…')).toBeInTheDocument()
})

test('calls onNameChange when typed', async () => {
  const fn = vi.fn()
  render(<NameStep name="" playerName="" onNameChange={fn} onPlayerNameChange={() => {}} />)
  await userEvent.type(screen.getByPlaceholderText('Enter character name…'), 'Zara')
  expect(fn).toHaveBeenCalled()
})
