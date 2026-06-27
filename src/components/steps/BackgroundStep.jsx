export default function BackgroundStep({ backgrounds, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Background</h2>
      <p className="text-stone-400 text-sm mb-6">When your background applies to a skill test, roll with advantage.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {backgrounds.map(bg => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.id === bg.id
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="font-semibold text-amber-100 mb-1">{bg.name}</div>
            <div className="text-xs text-stone-400">{bg.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
