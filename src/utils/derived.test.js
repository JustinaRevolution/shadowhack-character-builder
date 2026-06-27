import { calcHP, calcAC, calcKarma, calcMP } from './derived'

const marksman = { hp_per_level: 8 }
const wageMage = { hp_per_level: 6, mp_per_level: 5 }
const noArmor  = { bonus: 0, heavy: false }
const light    = { bonus: 2, heavy: false }
const heavy    = { bonus: 0, heavy: true }

test('calcHP returns hp_per_level for level 1', () => {
  expect(calcHP(marksman)).toBe(8)
  expect(calcHP(wageMage)).toBe(6)
  expect(calcHP(null)).toBeNull()
})

test('calcAC with no armor uses 10 + DEX', () => {
  expect(calcAC(noArmor, 3)).toBe(13)
  expect(calcAC(noArmor, -1)).toBe(9)
})

test('calcAC with light armor adds bonus to 10 + DEX', () => {
  expect(calcAC(light, 2)).toBe(14)
})

test('calcAC with heavy armor is always 20', () => {
  expect(calcAC(heavy, 3)).toBe(20)
  expect(calcAC(heavy, -1)).toBe(20)
})

test('calcAC with null armor defaults to 10', () => {
  expect(calcAC(null, 2)).toBe(12)
})

test('calcKarma is 6 with no cyberware', () => {
  expect(calcKarma(null)).toBe(6)
})

test('calcKarma is 4 with one cyberware piece', () => {
  expect(calcKarma({ name: 'Wired Reflexes' })).toBe(4)
})

test('calcMP returns mp_per_level for Wage Mage', () => {
  expect(calcMP(wageMage)).toBe(5)
  expect(calcMP(marksman)).toBeNull()
  expect(calcMP(null)).toBeNull()
})
