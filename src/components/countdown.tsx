"use client"

const units: [string, string][] = [
  ["00", "DAYS"],
  ["00", "HOURS"],
  ["00", "MINUTES"],
]

export default function Countdown() {
  return (
    <div className="theatron-countdown" aria-label="Event countdown">
      {units.map(([value, label]) => (
        <div className="countdown-unit" key={label}>
          <div className="countdown-card" aria-hidden="true">
            <div className="countdown-value">{value}</div>
            <div className="countdown-split" />
          </div>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
