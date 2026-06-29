const POOL = [3, 3, 2, 1, 0, -1]
const STATS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
const STAT_USE = {
  STR: 'Melee attacks & damage, Strength athletics',
  DEX: 'Ranged attacks & damage, Rogue skills, Acrobatics, DEX saves',
  CON: 'Resist poison/environment, Endurance athletics',
  INT: 'Research, Crafting, Spell tests, Spell resistance',
  WIS: 'Perception tests, Spell tests, Spell resistance',
  CHA: 'Social interaction (Intimidation, Charm, Persuade, Deceive)',
}

function fmtMod(v) {
  if (v === null) return '—'
  return v >= 0 ? `+${v}` : `${v}`
}

function remainingPool(attributes) {
  const pool = [...POOL]
  for (const v of Object.values(attributes)) {
    if (v !== null) {
      const i = pool.indexOf(v)
      if (i !== -1) pool.splice(i, 1)
    }
  }
  return pool
}

function availableForStat(stat, attributes) {
  const pool = [...POOL]
  for (const [key, val] of Object.entries(attributes)) {
    if (key !== stat && val !== null) {
      const i = pool.indexOf(val)
      if (i !== -1) pool.splice(i, 1)
    }
  }
  return pool
}

export default function AttributesStep({ attributes, onAttributeChange, hp, ac, karma }) {
  const pool = remainingPool(attributes)
  const poolLabel = pool.length === 0
    ? 'All assigned!'
    : 'Remaining: ' + pool.map(fmtMod).join(', ')

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Attributes</h2>
      <p className="text-stone-400 text-sm mb-2">
        Assign these modifiers to your six stats:{' '}
        <span className="text-amber-300">+3, +3, +2, +1, +0, -1</span>
      </p>
      <p className="text-stone-500 text-xs mb-6">{poolLabel}</p>

      {/* Derived stats preview */}
      <div className="flex gap-4 mb-6 text-center">
        {[['HP', hp ?? '—'], ['AC', ac ?? '—'], ['Karma', karma ?? '—']].map(([lbl, val]) => (
          <div key={lbl} className="bg-stone-800 border border-stone-600 rounded px-4 py-2">
            <div className="text-xs text-stone-400">{lbl}</div>
            <div className="text-xl font-bold text-amber-100">{val}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {STATS.map(stat => {
          const current = attributes[stat]
          const available = availableForStat(stat, attributes)
          return (
            <div key={stat} className="flex items-center gap-4">
              <span className="w-10 font-bold text-amber-200">{stat}</span>
              <select
                value={current ?? ''}
                onChange={e => {
                  const val = e.target.value === '' ? null : Number(e.target.value)
                  onAttributeChange(stat, val)
                }}
                className="bg-stone-800 border border-stone-600 rounded px-2 py-1 text-amber-100 w-20"
              >
                <option value="">—</option>
                {available.map((v, i) => (
                  <option key={i} value={v}>{fmtMod(v)}</option>
                ))}
              </select>
              <span className="text-xs text-stone-500 flex-1">{STAT_USE[stat]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
