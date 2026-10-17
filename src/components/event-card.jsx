"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { eventRules } from "@/data/event-rules"
import RulesModal from "@/components/rules-modal"

export default function EventCard({
  title,
  description,
  entryFee,
  image,
  highlighted = false,
  registrationPath,
  index = 0,
}) {
  const [showRules, setShowRules] = useState(false)
  const href = registrationPath || "/registration"
  const rules = eventRules[href.split("/").pop()]

  const registerClass = "nx-btn nx-btn-primary w-full px-4 py-3 text-center text-xs sm:text-sm"

  return (
    <div
      className={`nx-panel nx-card nx-rise group flex flex-col overflow-hidden rounded-lg ${highlighted ? "border-crimson-300/70" : ""}`}
      style={{ "--i": index }}
    >
      <div className="relative h-48 sm:h-56 md:h-64 shrink-0 overflow-hidden bg-ink-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={highlighted}
        />
        {/* stage-light falloff into the card body */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent via-35% to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <h3 className="nx-display mb-2 text-lg font-bold text-ivory sm:text-xl md:mb-3">{title}</h3>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-stone-400 sm:text-sm">{description}</p>

        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-crimson-500/60 to-transparent" />

        <div className="mb-4 flex items-baseline justify-between gap-3">
          <p className="text-[11px] tracking-[0.2em] text-stone-500">ENTRY FEE</p>
          <p className="nx-display text-right text-base font-bold text-crimson-300 md:text-lg">{entryFee}</p>
        </div>

        {rules ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="nx-btn nx-btn-ghost px-4 py-3 text-xs sm:text-sm"
              onClick={() => setShowRules(true)}
            >
              Rules
            </button>
            <button type="button" className={registerClass} onClick={() => setShowRules(true)}>
              Register →
            </button>
          </div>
        ) : (
          <Link href={href} className={registerClass}>
            Register →
          </Link>
        )}
      </div>

      {rules && showRules && (
        <RulesModal rules={rules} proceedHref={href} onClose={() => setShowRules(false)} />
      )}
    </div>
  )
}
