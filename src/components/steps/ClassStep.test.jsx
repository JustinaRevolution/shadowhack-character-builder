import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClassStep from './ClassStep'

const marksman = {
  name: 'Marksman', hp_per_level: 8,
  description: 'Firearms specialist.',
  level_1_feature: 'Attack twice with chosen firearm.',
  sub_choice: { type: 'firearm', label: 'Choose firearm type', options: ['Pistols', 'SMGs', 'Rifles'] }
}
const agent = {
  name: 'Espionage Agent', hp_per_level: 8,
  description: 'Rogue skills specialist.',
  level_1_feature: 'Rogue skills with advantage.',
  sub_choice: null
}
const wageMage = {
  name: 'Wage Mage', hp_per_level: 6,
  description: 'Street mage.',
  level_1_feature: 'Cast 1st level spells.',
  spellcasting: true,
  sub_choice: { type: 'spells', label: 'Choose starting spells', count: 2, tier: 1 }
}

const tier1Spells = [
  { name: 'Alarm', tier: 1, class: 'Wizard', description: 'Set a magical alarm.' },
  { name: 'Burning Hands', tier: 1, class: 'Wizard', description: 'Deal 1d6 fire damage.' },
]

test('renders all class cards', () => {
  render(<ClassStep classes={[marksman, agent]} selected={null} subChoice={null} spells={[]} onSelect={() => {}} onSubChoiceChange={() => {}} onSpellToggle={() => {}} allSpells={tier1Spells} />)
  expect(screen.getByText('Marksman')).toBeInTheDocument()
  expect(screen.getByText('Espionage Agent')).toBeInTheDocument()
})

test('calls onSelect when a class card is clicked', async () => {
  const fn = vi.fn()
  render(<ClassStep classes={[marksman, agent]} selected={null} subChoice={null} spells={[]} onSelect={fn} onSubChoiceChange={() => {}} onSpellToggle={() => {}} allSpells={tier1Spells} />)
  await userEvent.click(screen.getByText('Marksman'))
  expect(fn).toHaveBeenCalledWith(marksman)
})

test('shows firearm sub-choice when Marksman selected', () => {
  render(<ClassStep classes={[marksman]} selected={marksman} subChoice={null} spells={[]} onSelect={() => {}} onSubChoiceChange={() => {}} onSpellToggle={() => {}} allSpells={tier1Spells} />)
  expect(screen.getByText('Pistols')).toBeInTheDocument()
  expect(screen.getByText('SMGs')).toBeInTheDocument()
  expect(screen.getByText('Rifles')).toBeInTheDocument()
})

test('shows spell picker when Wage Mage selected', () => {
  render(<ClassStep classes={[wageMage]} selected={wageMage} subChoice={null} spells={[]} onSelect={() => {}} onSubChoiceChange={() => {}} onSpellToggle={() => {}} allSpells={tier1Spells} />)
  expect(screen.getByText('Alarm')).toBeInTheDocument()
  expect(screen.getByText('Burning Hands')).toBeInTheDocument()
})

test('no sub-choice shown for Espionage Agent', () => {
  render(<ClassStep classes={[agent]} selected={agent} subChoice={null} spells={[]} onSelect={() => {}} onSubChoiceChange={() => {}} onSpellToggle={() => {}} allSpells={tier1Spells} />)
  expect(screen.queryByText('Pistols')).toBeNull()
})
