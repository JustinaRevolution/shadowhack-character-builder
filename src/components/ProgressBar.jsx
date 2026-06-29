export default function ProgressBar({ steps, current }) {
  return (
    <div className="flex items-center gap-1 mb-8 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1 flex-shrink-0">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
            i === current ? 'bg-green-600 text-black' :
            i < current  ? 'bg-zinc-800 text-green-600' :
                           'bg-black/80 text-[#003b00]'
          }`}>
            <span>{i + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-3 h-px ${i < current ? 'bg-green-800' : 'bg-[#003b00]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
