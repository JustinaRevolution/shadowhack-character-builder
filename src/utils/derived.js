export function calcHP(characterClass) {
  if (!characterClass) return null
  return characterClass.hp_per_level
}

export function calcAC(armor, dexMod) {
  if (!armor) return 10 + (dexMod ?? 0)
  if (armor.heavy) return 20
  return 10 + (dexMod ?? 0) + armor.bonus
}

export function calcKarma(cyberware) {
  return 6 - (cyberware ? 2 : 0)
}

export function calcMP(characterClass) {
  if (!characterClass?.mp_per_level) return null
  return characterClass.mp_per_level
}
