export default function BackgroundStep({ backgrounds, selected, onSelect }) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
        data-text="Background"
      >
        Background
      </h2>
      <p className="text-[#008f11] text-sm mb-6">When your background applies to a skill test, roll with advantage.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {backgrounds.map(bg => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.id === bg.id
                ? 'border-[#00ff41] bg-green-950'
                : 'border-[#003b00] bg-black/80 hover:border-green-600'
            }`}
          >
            <div className="font-semibold text-green-200 mb-1">{bg.name}</div>
            <div className="text-xs text-[#008f11]">{bg.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
