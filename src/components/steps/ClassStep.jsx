export default function ClassStep({ classes, selected, subChoice, spells, onSelect, onSubChoiceChange, onSpellToggle, allSpells }) {
  const sub = selected?.sub_choice

  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
        data-text="Choose Your Class"
      >
        Choose Your Class
      </h2>
      <p className="text-[#008f11] text-sm mb-6">Classes go to level 5. You can multiclass into a second class to reach level 10.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {classes.map(cls => (
          <button
            key={cls.name}
            onClick={() => onSelect(cls)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === cls.name
                ? 'border-[#00ff41] bg-green-950'
                : 'border-[#003b00] bg-black/80 hover:border-green-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-green-200 text-sm">{cls.name}</span>
              {cls.spellcasting && (
                <span className="text-xs bg-indigo-900 text-indigo-300 px-1 rounded">Magic</span>
              )}
            </div>
            <div className="text-xs text-[#003b00]">{cls.hp_per_level} HP/level</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-black/80 border border-[#003b00] rounded-lg p-4 space-y-4">
          <div>
            <div className="text-sm text-[#008f11] mb-1">{selected.description}</div>
            <div className="text-sm text-green-300 font-medium">Level 1: {selected.level_1_feature}</div>
          </div>

          {sub?.type === 'firearm' && (
            <div>
              <div className="text-sm font-semibold text-green-400 mb-2">{sub.label}</div>
              <div className="flex gap-2 flex-wrap">
                {sub.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => onSubChoiceChange({ value: opt })}
                    className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                      subChoice?.value === opt
                        ? 'border-[#00ff41] bg-green-950 text-green-200'
                        : 'border-[#003b00] bg-zinc-900 text-green-400 hover:border-green-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sub?.type === 'fighting_move' && (
            <div>
              <div className="text-sm font-semibold text-green-400 mb-2">{sub.label}</div>
              <div className="grid grid-cols-1 gap-2">
                {sub.options.map(opt => (
                  <button
                    key={opt.name}
                    onClick={() => onSubChoiceChange({ value: opt.name })}
                    className={`p-3 rounded border text-left transition-colors ${
                      subChoice?.value === opt.name
                        ? 'border-[#00ff41] bg-green-950'
                        : 'border-[#003b00] bg-zinc-900 hover:border-green-600'
                    }`}
                  >
                    <span className="font-semibold text-green-200 text-sm">{opt.name}</span>
                    <span className="text-xs text-[#008f11] ml-2">{opt.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {sub?.type === 'elemental' && (
            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold text-green-400 mb-2">{sub.label_element}</div>
                <div className="flex gap-2">
                  {sub.elements.map(el => (
                    <button
                      key={el}
                      onClick={() => onSubChoiceChange({ ...subChoice, element: el })}
                      className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                        subChoice?.element === el
                          ? 'border-[#00ff41] bg-green-950 text-green-200'
                          : 'border-[#003b00] bg-zinc-900 text-green-400 hover:border-green-600'
                      }`}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-green-400 mb-2">{sub.label_stat}</div>
                <div className="flex gap-2">
                  {sub.spell_stats.map(stat => (
                    <button
                      key={stat}
                      onClick={() => onSubChoiceChange({ ...subChoice, spellStat: stat })}
                      className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                        subChoice?.spellStat === stat
                          ? 'border-[#00ff41] bg-green-950 text-green-200'
                          : 'border-[#003b00] bg-zinc-900 text-green-400 hover:border-green-600'
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sub?.type === 'spells' && (
            <div>
              <div className="text-sm font-semibold text-green-400 mb-1">{sub.label}</div>
              <div className="text-xs text-[#003b00] mb-3">
                Choose {sub.count} spells — {spells.length}/{sub.count} selected
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {allSpells.filter(s => s.tier === sub.tier).map(spell => {
                  const isSelected = spells.some(s => s.name === spell.name)
                  const atLimit = spells.length >= sub.count
                  return (
                    <button
                      key={spell.name}
                      onClick={() => onSpellToggle(spell)}
                      disabled={!isSelected && atLimit}
                      className={`w-full p-3 rounded border text-left transition-colors disabled:opacity-40 ${
                        isSelected
                          ? 'border-[#00ff41] bg-green-950'
                          : 'border-[#003b00] bg-zinc-900 hover:border-green-600'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-green-200 text-sm">{spell.name}</span>
                        <span className="text-xs text-[#008f11] ml-2">{spell.duration} · {spell.range}</span>
                      </div>
                      <div className="text-xs text-[#008f11] mt-1">{spell.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
