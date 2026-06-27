import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LifestyleStep from './LifestyleStep'

const cw = [{ name: 'Wired Reflexes', karma_cost: 2, description: 'Counter-attack reaction.' }]

test('renders both lifestyle options', () => {
  render(<LifestyleStep lifestyle={null} cyberware={null} cyberwareOptions={cw} onLifestyleChange={() => {}} onCyberwareChange={() => {}} karma={6} />)
  expect(screen.getByText('Medium Lifestyle')).toBeInTheDocument()
  expect(screen.getByText('Low Lifestyle + Cyberware')).toBeInTheDocument()
})

test('cyberware picker appears when Low chosen', () => {
  render(<LifestyleStep lifestyle="low" cyberware={null} cyberwareOptions={cw} onLifestyleChange={() => {}} onCyberwareChange={() => {}} karma={6} />)
  expect(screen.getByText('Wired Reflexes')).toBeInTheDocument()
})

test('cyberware picker hidden when Medium chosen', () => {
  render(<LifestyleStep lifestyle="medium" cyberware={null} cyberwareOptions={cw} onLifestyleChange={() => {}} onCyberwareChange={() => {}} karma={6} />)
  expect(screen.queryByText('Wired Reflexes')).toBeNull()
})

test('shows karma pool value', () => {
  render(<LifestyleStep lifestyle={null} cyberware={null} cyberwareOptions={cw} onLifestyleChange={() => {}} onCyberwareChange={() => {}} karma={4} />)
  expect(screen.getByText('4')).toBeInTheDocument()
})
