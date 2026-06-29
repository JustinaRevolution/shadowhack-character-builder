export default function NameStep({ name, playerName, onNameChange, onPlayerNameChange }) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-6 glitch glitch-slow"
        data-text="Who Are You?"
      >
        Who Are You?
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-[#008f11] text-sm mb-1">Character Name <span className="text-[#00ff41]">*</span></label>
          <input
            type="text"
            value={name}
            onChange={e => onNameChange(e.target.value)}
            placeholder="Enter character name…"
            className="w-full bg-black/80 border border-[#003b00] rounded px-3 py-2 text-green-200 placeholder-[#003b00] focus:outline-none focus:border-[#00ff41]"
          />
        </div>
        <div>
          <label className="block text-[#008f11] text-sm mb-1">Player Name</label>
          <input
            type="text"
            value={playerName}
            onChange={e => onPlayerNameChange(e.target.value)}
            placeholder="Enter player name…"
            className="w-full bg-black/80 border border-[#003b00] rounded px-3 py-2 text-green-200 placeholder-[#003b00] focus:outline-none focus:border-[#00ff41]"
          />
        </div>
      </div>
    </div>
  )
}
