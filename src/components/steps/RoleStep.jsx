export default function RoleStep({ roles, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Party Role</h2>
      <p className="text-stone-400 text-sm mb-6">Select one role that describes how you function in the group. Spend karma to activate it.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map(role => (
          <button
            key={role.name}
            onClick={() => onSelect(role)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === role.name
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-amber-100">{role.name}</span>
              {role.passive
                ? <span className="text-xs bg-stone-700 text-stone-300 px-1.5 py-0.5 rounded">Passive</span>
                : <span className="text-xs bg-amber-900 text-amber-300 px-1.5 py-0.5 rounded">{role.karma_cost} karma</span>
              }
            </div>
            <div className="text-xs text-stone-400">{role.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
