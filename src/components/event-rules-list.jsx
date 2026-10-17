// Shared rules layout: used by the REGISTER popup and the registration pages.
export default function EventRulesList({ rules, prizePool }) {
  return (
    <div>
      <ol className="space-y-3">
        {rules.map((rule, index) => (
          <li
            key={rule}
            className="flex items-start gap-3 rounded-md border border-crimson-500/15 bg-ink-950/50 px-3 py-3 sm:px-4"
          >
            <span className="nx-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-crimson-300/70 bg-gradient-to-b from-crimson-400 to-crimson-700 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-stone-200 sm:text-base">{rule}</span>
          </li>
        ))}
      </ol>

      {prizePool && (
        <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-crimson-400/60 bg-crimson-950/50 px-4 py-2 text-sm">
          <span className="font-bold uppercase tracking-wider text-crimson-300">Prize pool</span>
          <span className="font-semibold text-ivory">{prizePool}</span>
        </div>
      )}
    </div>
  )
}
