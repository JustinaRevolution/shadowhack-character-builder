export default function ClassStep({ classes, selected, subChoice, spells, onSelect, onSubChoiceChange, onSpellToggle, allSpells }) {
  const sub = selected?.sub_choice

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Choose Your Class</h2>
      <p className="text-stone-400 text-sm mb-6">Classes go to level 5. You can multiclass into a second class to reach level 10.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {classes.map(cls => (
          <button
            key={cls.name}
            onClick={() => onSelect(cls)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === cls.name
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-amber-100 text-sm">{cls.name}</span>
              {cls.spellcasting && (
                <span className="text-xs bg-indigo-900 text-indigo-300 px-1 rounded">Magic</span>
              )}
            </div>
            <div className="text-xs text-stone-500">{cls.hp_per_level} HP/level</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 space-y-4">
          <div>
            <div className="text-sm text-stone-400 mb-1">{selected.description}</div>
            <div className="text-sm text-amber-200 font-medium">Level 1: {selected.level_1_feature}</div>
          </div>

          {/* Firearm sub-choice (Marksman) */}
          {sub?.type === 'firearm' && (
            <div>
              <div className="text-sm font-semibold text-stone-300 mb-2">{sub.label}</div>
              <div className="flex gap-2 flex-wrap">
                {sub.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => onSubChoiceChange({ value: opt })}
                    className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                      subChoice?.value === opt
                        ? 'border-amber-400 bg-amber-950 text-amber-100'
                        : 'border-stone-600 bg-stone-700 text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fighting move sub-choice (Melee Expert) */}
          {sub?.type === 'fighting_move' && (
            <div>
              <div className="text-sm font-semibold text-stone-300 mb-2">{sub.label}</div>
              <div className="grid grid-cols-1 gap-2">
                {sub.options.map(opt => (
                  <button
                    key={opt.name}
                    onClick={() => onSubChoiceChange({ value: opt.name })}
                    className={`p-3 rounded border text-left transition-colors ${
                      subChoice?.value === opt.name
                        ? 'border-amber-400 bg-amber-950'
                        : 'border-stone-600 bg-stone-700 hover:border-stone-500'
                    }`}
                  >
                    <span className="font-semibold text-amber-100 text-sm">{opt.name}</span>
                    <span className="text-xs text-stone-400 ml-2">{opt.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Elemental sub-choice (Elemental Avatar) */}
          {sub?.type === 'elemental' && (
            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold text-stone-300 mb-2">{sub.label_element}</div>
                <div className="flex gap-2">
                  {sub.elements.map(el => (
                    <button
                      key={el}
                      onClick={() => onSubChoiceChange({ ...subChoice, element: el })}
                      className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                        subChoice?.element === el
                          ? 'border-amber-400 bg-amber-950 text-amber-100'
                          : 'border-stone-600 bg-stone-700 text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-300 mb-2">{sub.label_stat}</div>
                <div className="flex gap-2">
                  {sub.spell_stats.map(stat => (
                    <button
                      key={stat}
                      onClick={() => onSubChoiceChange({ ...subChoice, spellStat: stat })}
                      className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                        subChoice?.spellStat === stat
                          ? 'border-amber-400 bg-amber-950 text-amber-100'
                          : 'border-stone-600 bg-stone-700 text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Spell picker (Wage Mage) */}
          {sub?.type === 'spells' && (
            <div>
              <div className="text-sm font-semibold text-stone-300 mb-1">{sub.label}</div>
              <div className="text-xs text-stone-500 mb-3">
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
                          ? 'border-amber-400 bg-amber-950'
                          : 'border-stone-600 bg-stone-700 hover:border-stone-500'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-amber-100 text-sm">{spell.name}</span>
                        <span className="text-xs text-stone-400 ml-2">{spell.duration} · {spell.range}</span>
                      </div>
                      <div className="text-xs text-stone-400 mt-1">{spell.description}</div>
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
