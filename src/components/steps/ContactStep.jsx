export default function ContactStep({ contacts, selected, onSelect }) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-[#00ff41] mb-2 glitch glitch-slow"
        data-text="Starting Contact"
      >
        Starting Contact
      </h2>
      <p className="text-[#008f11] text-sm mb-6">You start with one level 1 contact. They treat all interactions as strictly business.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map(contact => (
          <button
            key={contact.name}
            onClick={() => onSelect(contact)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === contact.name
                ? 'border-[#00ff41] bg-green-950'
                : 'border-[#003b00] bg-black/80 hover:border-green-600'
            }`}
          >
            <div className="font-semibold text-green-200 mb-1">{contact.name}</div>
            <div className="text-xs text-[#008f11]">{contact.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
