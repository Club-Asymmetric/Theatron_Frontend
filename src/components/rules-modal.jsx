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
      className="nx-modal-backdrop fixed inset-0 z-[1000] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${rules.title} rules`}
      onClick={onClose}
    >
      <div
        className="nx-panel nx-modal relative max-h-[85vh] max-h-[85dvh] w-full max-w-2xl cursor-default overflow-y-auto rounded-lg p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-[2] text-stone-400 transition hover:text-crimson-200"
          onClick={onClose}
          aria-label="Close rules"
        >
          <X size={22} />
        </button>

        <p className="mb-2 text-xs tracking-[0.3em] text-crimson-300">EVENT RULES</p>
        <h2 className="nx-display nx-lacquer mb-4 pr-8 text-2xl font-bold">{rules.title}</h2>
        <div className="mb-5 h-px bg-gradient-to-r from-crimson-400/70 via-crimson-500/30 to-transparent" />

        <div className="mb-6">
          <EventRulesList rules={rules.rules} prizePool={rules.prizePool} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="nx-btn nx-btn-ghost px-5 py-2.5 text-xs"
            onClick={onClose}
          >
            Close
          </button>
          {proceedHref && (
            <Link href={proceedHref} className="nx-btn nx-btn-primary px-5 py-2.5 text-center text-xs">
              I Agree, Proceed →
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
