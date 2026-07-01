export default function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {index && <span className="font-mono text-xs text-weld">{index}</span>}
      <span className="h-px w-8 bg-weld" />
      <span className="font-display uppercase tracking-[0.2em] text-sm text-steel">{children}</span>
    </div>
  )
}
