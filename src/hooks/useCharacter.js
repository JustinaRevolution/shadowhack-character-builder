import { useState } from 'react'

const INITIAL_ATTRIBUTES = { STR: null, DEX: null, CON: null, INT: null, WIS: null, CHA: null }

const INITIAL = {
  name: '',
  playerName: '',
  characterClass: null,
  subChoice: null,
  attributes: { ...INITIAL_ATTRIBUTES },
  background: null,
  role: null,
  contact: null,
  lifestyle: null,
  cyberware: null,
  weapon: null,
  armor: null,
  spells: [],
}

export function useCharacter() {
  const [character, setCharacter] = useState(INITIAL)

  function setField(field, value) {
    setCharacter(prev => ({ ...prev, [field]: value }))
  }

  function setAttribute(stat, value) {
    setCharacter(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [stat]: value },
    }))
  }

  function setSpell(spell) {
    setCharacter(prev => ({ ...prev, spells: [...prev.spells, spell] }))
  }

  function removeSpell(name) {
    setCharacter(prev => ({ ...prev, spells: prev.spells.filter(s => s.name !== name) }))
  }

  function reset() {
    setCharacter({ ...INITIAL, attributes: { ...INITIAL_ATTRIBUTES } })
  }

  return { character, setField, setAttribute, setSpell, removeSpell, reset }
}
