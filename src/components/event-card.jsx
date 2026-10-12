"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { eventRules } from "@/data/event-rules"
import EventRulesList from "@/components/event-rules-list"

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

  useEffect(() => {
    if (!showRules) return undefined
    const onKey = (event) => event.key === "Escape" && setShowRules(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [showRules])

  const buttonClass =
    "bg-red-600 px-4 sm:px-6 py-2 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition w-full sm:w-auto"

  return (
    <div
      className={`group cursor-pointer transition ${highlighted ? "border-2 border-red-600" : "border border-gray-700"}`}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={highlighted}
        />
      </div>

      <div className="p-4 sm:p-5 md:p-6 bg-black">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 leading-relaxed">{description}</p>

        <div className="h-px bg-red-600 mb-3 md:mb-4"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <p className="text-xs text-gray-500 mb-1">ENTRY FEE</p>
            <p className="text-red-600 font-bold text-base md:text-lg">{entryFee}</p>
          </div>
          {rules ? (
            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                className="flex-1 border border-red-600 px-4 sm:px-5 py-2 text-red-500 font-bold text-xs sm:text-sm hover:bg-red-600 hover:text-white transition sm:flex-none"
                onClick={() => setShowRules(true)}
              >
                RULES
              </button>
              <button type="button" className={`${buttonClass} flex-1 sm:flex-none`} onClick={() => setShowRules(true)}>
                REGISTER →
              </button>
            </div>
          ) : (
            <Link href={href}>
              <button type="button" className={buttonClass}>
                REGISTER →
              </button>
            </Link>
          )}
        </div>
      </div>

      {rules && showRules && createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${rules.title} rules`}
          onClick={() => setShowRules(false)}
        >
          <div
            className="relative max-h-[85vh] max-h-[85dvh] w-full max-w-2xl cursor-default overflow-y-auto rounded-lg border-2 border-red-600 bg-gray-950 p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
              onClick={() => setShowRules(false)}
              aria-label="Close rules"
            >
              <X size={22} />
            </button>

            <p className="mb-1 text-xs tracking-widest text-red-600">EVENT RULES</p>
            <h2 className="mb-4 pr-8 text-2xl font-bold text-white">{rules.title}</h2>
            <div className="mb-4 h-px bg-red-600" />

            <div className="mb-6">
              <EventRulesList rules={rules.rules} prizePool={rules.prizePool} />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="border border-gray-600 px-5 py-2 text-sm font-bold text-gray-300 transition hover:border-white hover:text-white"
                onClick={() => setShowRules(false)}
              >
                CLOSE
              </button>
              <Link href={href}>
                <button type="button" className="w-full bg-red-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-700">
                  I AGREE, PROCEED →
                </button>
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
