export default function RoleStep({ roles, selected, onSelect }) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
        data-text="Party Role"
      >
        Party Role
      </h2>
      <p className="text-[#008f11] text-sm mb-6">Select one role that describes how you function in the group. Spend karma to activate it.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map(role => (
          <button
            key={role.name}
            onClick={() => onSelect(role)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === role.name
                ? 'border-[#00ff41] bg-green-950'
                : 'border-[#003b00] bg-black/80 hover:border-green-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-green-200">{role.name}</span>
              {role.passive
                ? <span className="text-xs bg-zinc-900 text-green-400 px-1.5 py-0.5 rounded">Passive</span>
                : <span className="text-xs bg-green-950 text-[#00ff41] px-1.5 py-0.5 rounded">{role.karma_cost} karma</span>
              }
            </div>
            <div className="text-xs text-[#008f11]">{role.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
