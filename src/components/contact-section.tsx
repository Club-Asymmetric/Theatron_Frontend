"use client"

import { useState } from "react"
import StageBackdrop from "@/components/stage-backdrop"
import {
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Tag,
  Loader2,
} from "lucide-react"

export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contacts = [
    {
      role: "Overall Coordinator",
      name: "Harivarman",
      phone: "+91 96773 21266",
      tel: "+919677321266",
    },
    {
      role: "Overall Coordinator",
      name: "Hariharran",
      phone: "+91 63790 41919",
      tel: "+916379041919",
    },
  ]

  const emails = [
    { label: "General & Entry Queries", address: "immersecit@gmail.com" },
    { label: "Official Support & Helpdesk", address: "theatroncit@gmail.com" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMsg("")
    setErrorMsg("")
    setIsSubmitting(true)
    try {
      let response
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        })
      } catch (localErr) {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://theatron-backend.onrender.com"
        response = await fetch(`${backendUrl}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        })
      }

      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(body.error || body.message || "Failed to send message.")
      }

      setSuccessMsg("Message sent successfully! We will get back to you soon.")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative z-10 overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10">
      <StageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <div className="nx-rise mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="nx-eyebrow mb-5">We&apos;re Listening</p>
          <h1 className="nx-display mb-4 text-4xl font-bold text-ivory sm:text-5xl md:text-6xl">
            GET IN{" "}
            <span className="nx-lacquer">TOUCH</span>
          </h1>

          <div className="nx-ornament my-5" aria-hidden="true">
            <i />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Have questions regarding film submissions, passes, workshop schedules, or
            festival events? Reach out directly to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-5">
            <div className="mb-1">
              <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base">
                <span className="h-4 w-1 rounded-full bg-gradient-to-b from-crimson-200 to-crimson-600" />
                Event Contacts
              </h2>
              <p className="mt-1.5 text-xs text-stone-500 sm:text-sm">
                Connect with the organizing team via email, phone, or visit our campus.
              </p>
            </div>

            <div className="nx-panel nx-rise rounded-2xl p-4 backdrop-blur-sm sm:p-5" style={{ "--i": 1 } as React.CSSProperties}>
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-crimson-300/70 bg-gradient-to-b from-crimson-400 via-crimson-600 to-crimson-800 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-crimson-300">
                      Student Coordinators
                    </p>
                    <h3 className="text-sm font-semibold text-white">Call Event Organizers</h3>
                  </div>
                  <div className="space-y-2">
                    {contacts.map((c) => (
                      <div
                        key={c.tel}
                        className="flex flex-col gap-2 rounded-xl border border-crimson-500/15 bg-ink-950/70 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-[11px] text-stone-500">{c.role}</p>
                          <p className="text-sm font-semibold text-white">{c.name}</p>
                        </div>
                        <a
                          href={`tel:${c.tel}`}
                          className="nx-btn nx-btn-primary shrink-0 gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.04em]"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {c.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nx-panel nx-rise rounded-2xl p-4 backdrop-blur-sm sm:p-5" style={{ "--i": 1 } as React.CSSProperties}>
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-crimson-300/70 bg-gradient-to-b from-crimson-400 via-crimson-600 to-crimson-800 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-crimson-300">
                      Official Emails
                    </p>
                    <h3 className="text-sm font-semibold text-white">General &amp; Entry Queries</h3>
                  </div>
                  <div className="space-y-2">
                    {emails.map((item) => (
                      <div
                        key={item.address}
                        className="rounded-xl border border-crimson-500/15 bg-ink-950/70 px-3 py-2.5"
                      >
                        <p className="text-[11px] text-stone-500">{item.label}</p>
                        <a
                          href={`mailto:${item.address}`}
                          className="mt-0.5 inline-block break-all text-sm font-semibold text-stone-200 transition hover:text-crimson-200"
                        >
                          {item.address}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="nx-panel nx-rise relative overflow-hidden rounded-2xl p-5 sm:p-7 md:p-8" style={{ "--i": 2 } as React.CSSProperties}>
              <div className="mb-6">
                <h2 className="nx-display mb-1.5 text-2xl font-bold uppercase text-ivory sm:text-3xl">
                  Send A <span className="nx-lacquer">Message</span>
                </h2>
                <p className="text-sm text-stone-500">
                  Fill out the form below and our festival team will respond as soon as possible.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {successMsg && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-4 text-sm text-emerald-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/50 p-4 text-sm text-red-300">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      <User className="h-3.5 w-3.5 text-crimson-300" />
                      Name <span className="text-crimson-300">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Full Name"
                      className="w-full nx-input text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      <Mail className="h-3.5 w-3.5 text-crimson-300" />
                      Email <span className="text-crimson-300">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full nx-input text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    <Tag className="h-3.5 w-3.5 text-crimson-300" />
                    Subject <span className="text-crimson-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Inquiry Subject (e.g. Film Submission, Passes)"
                    className="w-full nx-input text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    <MessageSquare className="h-3.5 w-3.5 text-crimson-300" />
                    Message <span className="text-crimson-300">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Write your query or message here..."
                    className="w-full resize-y nx-input text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="nx-btn nx-btn-primary flex w-full gap-2 rounded-xl py-3.5 text-sm font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
