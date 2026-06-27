export default function ContactStep({ contacts, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Starting Contact</h2>
      <p className="text-stone-400 text-sm mb-6">You start with one level 1 contact. They treat all interactions as strictly business.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map(contact => (
          <button
            key={contact.name}
            onClick={() => onSelect(contact)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === contact.name
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="font-semibold text-amber-100 mb-1">{contact.name}</div>
            <div className="text-xs text-stone-400">{contact.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
