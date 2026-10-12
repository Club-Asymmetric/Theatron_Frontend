// Shared rules layout: used by the REGISTER popup and the registration pages.
export default function EventRulesList({ rules, prizePool }) {
  return (
    <div>
      <ol className="space-y-3">
        {rules.map((rule, index) => (
          <li
            key={rule}
            className="flex items-start gap-3 rounded-md border border-gray-800 bg-black/40 px-3 py-3 sm:px-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-gray-200 sm:text-base">{rule}</span>
          </li>
        ))}
      </ol>

      {prizePool && (
        <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-red-600 bg-red-950/40 px-4 py-2 text-sm">
          <span className="font-bold uppercase tracking-wider text-red-500">Prize pool</span>
          <span className="font-semibold text-white">{prizePool}</span>
        </div>
      )}
    </div>
  )
}
