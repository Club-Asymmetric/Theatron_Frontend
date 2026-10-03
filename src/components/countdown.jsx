"use client"

const units = [
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
/*"use client"

import { useEffect, useState } from "react"

const EVENT_DATE = new Date("2026-10-04T18:00:00").getTime()

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const difference = EVENT_DATE - Date.now()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      )
      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      )

      setTimeLeft({
        days,
        hours,
        minutes,
      })
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  const units = [
    [timeLeft.days, "DAYS"],
    [timeLeft.hours, "HOURS"],
    [timeLeft.minutes, "MINUTES"],
  ]

  return (
    <div className="theatron-countdown" aria-label="Event countdown">
      {units.map(([value, label]) => (
        <div className="countdown-unit" key={label}>
          <div className="countdown-card" aria-hidden="true">
            <div className="countdown-value">
              {String(value).padStart(2, "0")}
            </div>

            <div className="countdown-split" />
          </div>

          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}*/
