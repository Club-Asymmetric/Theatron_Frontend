"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { X } from "lucide-react"
import EventRulesList from "@/components/event-rules-list"

// Rules popup. Rendered into document.body so it always sits above the navbar.
// Pass `proceedHref` to show an "I agree, proceed" link (event cards); omit it on the registration page.
export default function RulesModal({ rules, onClose, proceedHref }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${rules.title} rules`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] max-h-[85dvh] w-full max-w-2xl cursor-default overflow-y-auto rounded-lg border-2 border-red-600 bg-gray-950 p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
          onClick={onClose}
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
            onClick={onClose}
          >
            CLOSE
          </button>
          {proceedHref && (
            <Link
              href={proceedHref}
              className="bg-red-600 px-5 py-2 text-center text-sm font-bold text-white transition hover:bg-red-700"
            >
              I AGREE, PROCEED →
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
