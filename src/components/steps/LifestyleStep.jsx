export default function LifestyleStep({ lifestyle, cyberware, cyberwareOptions, onLifestyleChange, onCyberwareChange, karma }) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
        data-text="Lifestyle & Starting Resources"
      >
        Lifestyle & Starting Resources
      </h2>
      <p className="text-[#008f11] text-sm mb-6">All characters start with <strong className="text-green-300">1,000 credits</strong>. Choose your starting lifestyle.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => { onLifestyleChange('medium'); onCyberwareChange(null) }}
          className={`p-4 rounded-lg border text-left transition-colors ${
            lifestyle === 'medium' ? 'border-[#00ff41] bg-green-950' : 'border-[#003b00] bg-black/80 hover:border-green-600'
          }`}
        >
          <div className="font-semibold text-green-200 mb-1">Medium Lifestyle</div>
          <div className="text-xs text-[#008f11]">6 months in a two-bed apartment. Own kitchen and bathroom. Mid-range car or sweet bike. 1,000 credits.</div>
        </button>

        <button
          onClick={() => onLifestyleChange('low')}
          className={`p-4 rounded-lg border text-left transition-colors ${
            lifestyle === 'low' ? 'border-[#00ff41] bg-green-950' : 'border-[#003b00] bg-black/80 hover:border-green-600'
          }`}
        >
          <div className="font-semibold text-green-200 mb-1">Low Lifestyle + Cyberware</div>
          <div className="text-xs text-[#008f11]">6 months in a capsule apartment (shared facilities). One piece of cyberware. 1,000 credits.</div>
        </button>
      </div>

      <div className="bg-black/80 border border-[#003b00] rounded-lg p-3 mb-6 flex items-center gap-3">
        <div className="text-sm text-[#008f11]">Karma Pool:</div>
        <div className="text-2xl font-bold text-[#00ff41]">{karma}</div>
        <div className="text-xs text-[#003b00]">Each piece of cyberware permanently costs 2 karma.</div>
      </div>

      {lifestyle === 'low' && (
        <div>
          <h3 className="text-sm font-semibold text-green-400 mb-3">Choose one piece of cyberware:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cyberwareOptions.map(cw => (
              <button
                key={cw.name}
                onClick={() => onCyberwareChange(cw)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  cyberware?.name === cw.name ? 'border-[#00ff41] bg-green-950' : 'border-[#003b00] bg-black/80 hover:border-green-600'
                }`}
              >
                <div className="font-semibold text-green-200 text-sm mb-1">{cw.name}</div>
                <div className="text-xs text-[#008f11]">{cw.description}</div>
                <div className="text-xs text-green-700 mt-1">−2 karma</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
