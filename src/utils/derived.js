export function calcHP(characterClass) {
  if (!characterClass) return null
  return characterClass.hp_per_level
}

export function calcAC(armor, dexMod, cyberware) {
  const dermalBonus = cyberware?.name === 'Dermal Plating' ? 4 : 0
  if (!armor) return 10 + (dexMod ?? 0) + dermalBonus
  if (armor.heavy) return 20
  return 10 + (dexMod ?? 0) + Math.max(armor.bonus, dermalBonus)
}

export function calcKarma(cyberware) {
  return 6 - (cyberware ? 2 : 0)
}

export function calcMP(characterClass) {
  if (!characterClass?.mp_per_level) return null
  return characterClass.mp_per_level
}
