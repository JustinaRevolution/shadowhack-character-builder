export default function ProgressBar({ steps, current }) {
  return (
    <div className="flex items-center gap-1 mb-8 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1 flex-shrink-0">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
            i === current ? 'bg-amber-600 text-stone-900' :
            i < current  ? 'bg-stone-600 text-stone-300' :
                           'bg-stone-800 text-stone-500'
          }`}>
            <span>{i + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-3 h-px ${i < current ? 'bg-stone-500' : 'bg-stone-700'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
