export default function LifestyleStep({ lifestyle, cyberware, cyberwareOptions, onLifestyleChange, onCyberwareChange, karma }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Lifestyle & Starting Resources</h2>
      <p className="text-stone-400 text-sm mb-6">All characters start with <strong className="text-amber-200">1,000 credits</strong>. Choose your starting lifestyle.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Medium lifestyle */}
        <button
          onClick={() => { onLifestyleChange('medium'); onCyberwareChange(null) }}
          className={`p-4 rounded-lg border text-left transition-colors ${
            lifestyle === 'medium' ? 'border-amber-400 bg-amber-950' : 'border-stone-600 bg-stone-800 hover:border-stone-400'
          }`}
        >
          <div className="font-semibold text-amber-100 mb-1">Medium Lifestyle</div>
          <div className="text-xs text-stone-400">6 months in a two-bed apartment. Own kitchen and bathroom. Mid-range car or sweet bike. 1,000 credits.</div>
        </button>

        {/* Low lifestyle */}
        <button
          onClick={() => onLifestyleChange('low')}
          className={`p-4 rounded-lg border text-left transition-colors ${
            lifestyle === 'low' ? 'border-amber-400 bg-amber-950' : 'border-stone-600 bg-stone-800 hover:border-stone-400'
          }`}
        >
          <div className="font-semibold text-amber-100 mb-1">Low Lifestyle + Cyberware</div>
          <div className="text-xs text-stone-400">6 months in a capsule apartment (shared facilities). One piece of cyberware. 1,000 credits.</div>
        </button>
      </div>

      {/* Karma pool display */}
      <div className="bg-stone-800 border border-stone-600 rounded-lg p-3 mb-6 flex items-center gap-3">
        <div className="text-sm text-stone-400">Karma Pool:</div>
        <div className="text-2xl font-bold text-amber-300">{karma}</div>
        <div className="text-xs text-stone-500">Each piece of cyberware permanently costs 2 karma.</div>
      </div>

      {/* Cyberware picker */}
      {lifestyle === 'low' && (
        <div>
          <h3 className="text-sm font-semibold text-stone-300 mb-3">Choose one piece of cyberware:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cyberwareOptions.map(cw => (
              <button
                key={cw.name}
                onClick={() => onCyberwareChange(cw)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  cyberware?.name === cw.name ? 'border-amber-400 bg-amber-950' : 'border-stone-600 bg-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="font-semibold text-amber-100 text-sm mb-1">{cw.name}</div>
                <div className="text-xs text-stone-400">{cw.description}</div>
                <div className="text-xs text-amber-700 mt-1">−2 karma</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
