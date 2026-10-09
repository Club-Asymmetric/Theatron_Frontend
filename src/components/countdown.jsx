"use client"

import { useState, useEffect } from "react"

const EVENT_DATE = new Date("2026-11-11T00:00:00").getTime()

export default function Countdown() {
  const [isMounted, setIsMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    setIsMounted(true)
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = EVENT_DATE - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)

    return () => clearInterval(interval)
  }, [])

  const pad = (num) => String(num).padStart(2, "0")

  const units = [
    [isMounted ? pad(timeLeft.days) : "00", "DAYS"],
    [isMounted ? pad(timeLeft.hours) : "00", "HOURS"],
    [isMounted ? pad(timeLeft.minutes) : "00", "MINUTES"],
  ]

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
