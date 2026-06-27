export default function GearStep({ weapons, armors, selectedWeapon, selectedArmor, onWeaponChange, onArmorChange, ac }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-amber-300 mb-2">Gear</h2>
        <div className="bg-stone-800 border border-stone-600 rounded px-3 py-2 inline-flex gap-2 items-center mb-4">
          <span className="text-xs text-stone-400">AC</span>
          <span className="text-xl font-bold text-amber-300">{ac}</span>
          <span className="text-xs text-stone-500 ml-1">(10 + DEX + armor)</span>
        </div>
      </div>

      {/* Weapons */}
      <div>
        <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wide mb-3">Weapon</h3>
        <div className="space-y-2">
          {weapons.map(w => (
            <button
              key={w.name}
              onClick={() => onWeaponChange(w)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                selectedWeapon?.name === w.name ? 'border-amber-400 bg-amber-950' : 'border-stone-600 bg-stone-800 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-amber-100 w-32">{w.name}</span>
                <span className="text-sm text-amber-300 w-16">{w.damage}</span>
                <span className="text-xs text-stone-400">{w.examples}</span>
              </div>
              {w.notes && <div className="text-xs text-stone-500 mt-1">{w.notes}</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Armor */}
      <div>
        <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wide mb-3">Armor</h3>
        <div className="space-y-2">
          {armors.map(a => (
            <button
              key={a.name}
              onClick={() => onArmorChange(a)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                selectedArmor?.name === a.name ? 'border-amber-400 bg-amber-950' : 'border-stone-600 bg-stone-800 hover:border-stone-400'
              }`}
            >
              <span className="font-semibold text-amber-100 w-32 inline-block">{a.name}</span>
              <span className="text-xs text-stone-400">{a.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
