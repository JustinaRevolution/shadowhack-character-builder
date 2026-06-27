import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GearStep from './GearStep'

const weapons = [
  { name: 'Unarmed', damage: 'STR only', examples: '', notes: '' },
  { name: 'Light Weapon', damage: '1D6', examples: 'Knife, pistol', notes: '' },
]
const armors = [
  { name: 'None', bonus: 0, heavy: false, description: 'AC = 10 + DEX.' },
  { name: 'Light Armor', bonus: 2, heavy: false, description: 'Stealthy.' },
]

test('renders weapon options', () => {
  render(<GearStep weapons={weapons} armors={armors} selectedWeapon={null} selectedArmor={null} onWeaponChange={() => {}} onArmorChange={() => {}} ac={10} />)
  expect(screen.getByText('Unarmed')).toBeInTheDocument()
  expect(screen.getByText('Light Weapon')).toBeInTheDocument()
})

test('renders armor options', () => {
  render(<GearStep weapons={weapons} armors={armors} selectedWeapon={null} selectedArmor={null} onWeaponChange={() => {}} onArmorChange={() => {}} ac={10} />)
  expect(screen.getByText('None')).toBeInTheDocument()
  expect(screen.getByText('Light Armor')).toBeInTheDocument()
})

test('calls onWeaponChange when weapon selected', async () => {
  const fn = vi.fn()
  render(<GearStep weapons={weapons} armors={armors} selectedWeapon={null} selectedArmor={null} onWeaponChange={fn} onArmorChange={() => {}} ac={10} />)
  await userEvent.click(screen.getByText('Light Weapon'))
  expect(fn).toHaveBeenCalledWith(weapons[1])
})
