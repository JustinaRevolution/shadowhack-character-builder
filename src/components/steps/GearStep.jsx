export default function GearStep({ weapons, armors, selectedWeapon, selectedArmor, onWeaponChange, onArmorChange, ac }) {
  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
          data-text="Gear"
        >
          Gear
        </h2>
        <div className="bg-black/80 border border-[#003b00] rounded px-3 py-2 inline-flex gap-2 items-center mb-4">
          <span className="text-xs text-[#008f11]">AC</span>
          <span className="text-xl font-bold text-[#00ff41]">{ac}</span>
          <span className="text-xs text-[#003b00] ml-1">(10 + DEX + armor)</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-3">Weapon</h3>
        <div className="space-y-2">
          {weapons.map(w => (
            <button
              key={w.name}
              onClick={() => onWeaponChange(w)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                selectedWeapon?.name === w.name ? 'border-[#00ff41] bg-green-950' : 'border-[#003b00] bg-black/80 hover:border-green-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-green-200 w-32">{w.name}</span>
                <span className="text-sm text-[#00ff41] w-16">{w.damage}</span>
                <span className="text-xs text-[#008f11]">{w.examples}</span>
              </div>
              {w.notes && <div className="text-xs text-[#003b00] mt-1">{w.notes}</div>}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-3">Armor</h3>
        <div className="space-y-2">
          {armors.map(a => (
            <button
              key={a.name}
              onClick={() => onArmorChange(a)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                selectedArmor?.name === a.name ? 'border-[#00ff41] bg-green-950' : 'border-[#003b00] bg-black/80 hover:border-green-600'
              }`}
            >
              <span className="font-semibold text-green-200 w-32 inline-block">{a.name}</span>
              <span className="text-xs text-[#008f11]">{a.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
