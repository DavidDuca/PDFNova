export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Converting…</span>
        <span className="text-sm font-semibold text-brand-500">{progress}%</span>
      </div>
      <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Reliable conversion can take a moment for complex layouts. Please don&apos;t close this tab.
      </p>
    </div>
  )
}
