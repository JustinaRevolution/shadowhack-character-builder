import { renderHook, act } from '@testing-library/react'
import { useCharacter } from './useCharacter'

test('initializes with empty state', () => {
  const { result } = renderHook(() => useCharacter())
  const { character } = result.current
  expect(character.name).toBe('')
  expect(character.characterClass).toBeNull()
  expect(character.attributes.STR).toBeNull()
  expect(character.spells).toEqual([])
  expect(character.lifestyle).toBeNull()
  expect(character.cyberware).toBeNull()
})

test('setField updates a single field', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setField('name', 'Zara'))
  expect(result.current.character.name).toBe('Zara')
  expect(result.current.character.playerName).toBe('')
})

test('setAttribute updates one attribute and leaves others null', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setAttribute('STR', 3))
  expect(result.current.character.attributes.STR).toBe(3)
  expect(result.current.character.attributes.DEX).toBeNull()
})

test('setSpell adds a spell to the list', () => {
  const { result } = renderHook(() => useCharacter())
  const spell = { name: 'Alarm', tier: 1 }
  act(() => result.current.setSpell(spell))
  expect(result.current.character.spells).toHaveLength(1)
  expect(result.current.character.spells[0].name).toBe('Alarm')
})

test('removeSpell removes a spell by name', () => {
  const { result } = renderHook(() => useCharacter())
  const spell = { name: 'Alarm', tier: 1 }
  act(() => result.current.setSpell(spell))
  act(() => result.current.removeSpell('Alarm'))
  expect(result.current.character.spells).toHaveLength(0)
})

test('reset returns to initial state', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setField('name', 'Zara'))
  act(() => result.current.reset())
  expect(result.current.character.name).toBe('')
})
