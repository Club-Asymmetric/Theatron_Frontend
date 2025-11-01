"use client"

import { useState, useEffect } from "react"

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const eventDate = new Date("2025-11-14").getTime()
      const distance = eventDate - now.getTime()

      if (distance > 0) {
        setTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="border-2 border-red-600 px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-10 mb-2">
        <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-red-600">{String(value).padStart(2, "0")}</p>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm md:text-lg tracking-wider">{label}</p>
    </div>
  )

  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
      <TimeBox value={time.days} label="DAYS" />
      <TimeBox value={time.hours} label="HOURS" />
      <TimeBox value={time.minutes} label="MINUTES" />
      <TimeBox value={time.seconds} label="SECONDS" />
    </div>
  )
}
