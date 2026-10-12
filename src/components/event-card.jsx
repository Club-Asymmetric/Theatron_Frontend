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
}) {
  const [showRules, setShowRules] = useState(false)
  const href = registrationPath || "/registration"
  const rules = eventRules[href.split("/").pop()]

  const registerClass =
    "block w-full bg-red-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-red-700"

  return (
    <div
      className={`group flex flex-col transition ${highlighted ? "border-2 border-red-600" : "border border-gray-700"}`}
    >
      <div className="relative h-48 sm:h-56 md:h-64 shrink-0 overflow-hidden bg-gray-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={highlighted}
        />
      </div>

      <div className="flex flex-1 flex-col bg-black p-4 sm:p-5 md:p-6">
        <h3 className="mb-2 text-lg font-bold text-white sm:text-xl md:mb-3">{title}</h3>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-gray-400 sm:text-sm">{description}</p>

        <div className="mb-3 h-px bg-red-600" />

        <div className="mb-4 flex items-baseline justify-between gap-3">
          <p className="text-xs text-gray-500">ENTRY FEE</p>
          <p className="text-right text-base font-bold text-red-600 md:text-lg">{entryFee}</p>
        </div>

        {rules ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="border border-red-600 px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-600 hover:text-white"
              onClick={() => setShowRules(true)}
            >
              RULES
            </button>
            <button type="button" className={registerClass} onClick={() => setShowRules(true)}>
              REGISTER →
            </button>
          </div>
        ) : (
          <Link href={href} className={registerClass}>
            REGISTER →
          </Link>
        )}
      </div>

      {rules && showRules && (
        <RulesModal rules={rules} proceedHref={href} onClose={() => setShowRules(false)} />
      )}
    </div>
  )
}
