import { calcHP, calcAC, calcKarma, calcMP } from '../../utils/derived'

function fmtMod(v) {
  if (v === null || v === undefined) return '—'
  return v >= 0 ? `+${v}` : `${v}`
}

const STAT_FULL = {
  STR: 'Strength',  DEX: 'Dexterity', CON: 'Constitution',
  INT: 'Intelligence', WIS: 'Wisdom', CHA: 'Charisma',
}
const STAT_USE = {
  STR: 'Melee attack & damage, strength athletics',
  DEX: 'Ranged attacks & damage, rogue skills, acrobatics, DEX saves',
  CON: 'Resist poison/environment, endurance athletics',
  INT: 'Research, crafting, spell tests, spell resistance',
  WIS: 'Perception tests, spell tests, spell resistance',
  CHA: 'Social interaction (intimidation, charm, persuade, deceive)',
}

function subChoiceSummary(cls, subChoice, spells) {
  if (!cls?.sub_choice) return null
  const sub = cls.sub_choice
  if (sub.type === 'firearm') return `Firearm specialty: ${subChoice?.value ?? '—'}`
  if (sub.type === 'fighting_move') return `Fighting move: ${subChoice?.value ?? '—'}`
  if (sub.type === 'elemental') return `Element: ${subChoice?.element ?? '—'} · Spell stat: ${subChoice?.spellStat ?? '—'}`
  if (sub.type === 'spells') return spells.map(s => s.name).join(', ')
  return null
}

export default function CharacterSheetStep({ character, onStartOver }) {
  const { name, playerName, characterClass: cls, subChoice, attributes, background, role, contact, lifestyle, cyberware, weapon, armor, spells } = character

  const dex = attributes.DEX ?? 0
  const hp  = calcHP(cls)
  const ac  = calcAC(armor, dex)
  const karma = calcKarma(cyberware)
  const mp  = calcMP(cls)
  const lifestyleLabel = lifestyle === 'medium' ? 'Medium — 6 months, own apartment, car/bike, 1,000 credits'
    : lifestyle === 'low' ? 'Low — 6 months, capsule apartment, 1,000 credits'
    : '—'

  return (
    <div className="space-y-6 print:text-black print:bg-white">
      {/* Header */}
      <div className="flex justify-between items-start print-hidden">
        <h2 className="text-2xl font-bold text-amber-300">Character Sheet</h2>
        <div className="flex gap-3 print:hidden">
          <button onClick={() => window.print()} className="px-4 py-2 bg-stone-700 hover:bg-stone-600 border border-stone-500 rounded text-sm text-amber-100">
            Print
          </button>
          <button onClick={onStartOver} className="px-4 py-2 bg-red-900 hover:bg-red-800 border border-red-700 rounded text-sm text-red-100">
            Start Over
          </button>
        </div>
      </div>

      {/* Title bar */}
      <div className="bg-stone-900 border border-amber-700 rounded-lg p-3 text-center print:border-black">
        <div className="text-xl font-bold tracking-widest text-amber-400 print:text-black">SHADOWHACK</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left column: Attributes + Karma */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Attributes</h3>
          {['STR','DEX','CON','INT','WIS','CHA'].map(stat => (
            <div key={stat} className="bg-stone-800 border border-stone-600 rounded p-2 print:border-stone-400">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-amber-300 w-8">{stat}</span>
                <span className="text-lg font-bold text-amber-100">{fmtMod(attributes[stat])}</span>
              </div>
              <div className="text-xs text-stone-500">{STAT_USE[stat]}</div>
            </div>
          ))}

          {/* Karma Pool */}
          <div className="bg-stone-800 border border-amber-800 rounded p-3 print:border-stone-400">
            <div className="font-bold text-amber-300 mb-1">Karma Pool: {karma}</div>
            <div className="text-xs text-stone-400 space-y-0.5">
              <div>☀ Add 1D6 to an action roll</div>
              <div>☀ Add 1D6 to AC until next turn (bonus action)</div>
              <div>☀ Add 1D6 damage to an attack or spell</div>
              <div>☀ Power special abilities (variable cost)</div>
            </div>
          </div>
        </div>

        {/* Right column: Identity + Stats + Abilities */}
        <div className="space-y-3">
          {[
            ['Name',        name || '—'],
            ['Player',      playerName || '—'],
            ['Background',  background?.name || '—'],
            ['Contact',     contact?.name || '—'],
            ['Role',        role?.name || '—'],
            ['Class & Level', cls ? `${cls.name} — Level 1` : '—'],
            ['HP & AC',     cls ? `${hp} HP / ${ac} AC` : '—'],
            ...(mp !== null ? [['Mana Points', `${mp} MP`]] : []),
          ].map(([lbl, val]) => (
            <div key={lbl} className="bg-stone-800 border border-stone-600 rounded px-3 py-2 print:border-stone-400">
              <div className="text-xs text-stone-400">{lbl}</div>
              <div className="font-semibold text-amber-100 print:text-black">{val}</div>
            </div>
          ))}

          {/* Class Abilities */}
          <div className="bg-stone-800 border border-stone-600 rounded p-3 print:border-stone-400">
            <div className="text-xs text-stone-400 mb-1">Class Abilities</div>
            {cls ? (
              <div className="space-y-1 text-sm text-amber-100">
                <div>{cls.level_1_feature}</div>
                {subChoiceSummary(cls, subChoice, spells) && (
                  <div className="text-stone-300 text-xs">{subChoiceSummary(cls, subChoice, spells)}</div>
                )}
                {spells.length > 0 && cls.sub_choice?.type !== 'spells' && (
                  <div className="text-stone-300 text-xs">Spells: {spells.map(s => s.name).join(', ')}</div>
                )}
              </div>
            ) : <div className="text-stone-600 text-sm">—</div>}
          </div>

          {/* Gear & Cyberware */}
          <div className="bg-stone-800 border border-stone-600 rounded p-3 print:border-stone-400">
            <div className="text-xs text-stone-400 mb-1">Gear & Cyberware</div>
            <div className="text-sm text-amber-100 space-y-0.5">
              {weapon && <div>Weapon: {weapon.name} ({weapon.damage})</div>}
              {armor && armor.name !== 'None' && <div>Armor: {armor.name}</div>}
              {cyberware && <div>Cyberware: {cyberware.name}</div>}
              {!weapon && !armor && !cyberware && <span className="text-stone-600">—</span>}
            </div>
          </div>

          {/* Lifestyle */}
          <div className="bg-stone-800 border border-stone-600 rounded p-3 print:border-stone-400">
            <div className="text-xs text-stone-400 mb-1">Lifestyle</div>
            <div className="text-sm text-amber-100">{lifestyleLabel}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-stone-700 pt-3 text-center print:border-stone-400">
        <p className="text-xs text-stone-500 tracking-wide">ROLL 3D6 AND ADD THE APPROPRIATE ATTRIBUTE TO DETERMINE SUCCESS</p>
      </div>
    </div>
  )
}
