export default function NameStep({ name, playerName, onNameChange, onPlayerNameChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-300">Who Are You?</h2>
      <div>
        <label className="block text-sm text-stone-400 mb-1">Character Name <span className="text-amber-500">*</span></label>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          placeholder="Character name…"
          className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-amber-100 text-lg placeholder-stone-600 focus:outline-none focus:border-amber-500"
        />
      </div>
      <div>
        <label className="block text-sm text-stone-400 mb-1">Player Name <span className="text-stone-600">(optional)</span></label>
        <input
          type="text"
          value={playerName}
          onChange={e => onPlayerNameChange(e.target.value)}
          placeholder="Your name…"
          className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-amber-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
        />
      </div>
    </div>
  )
}
