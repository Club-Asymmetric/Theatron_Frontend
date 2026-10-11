"use client"

import { useState } from "react"
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
      await fetch(
        "https://script.google.com/macros/s/AKfycbxpjbdTT0V1w2ho_jVO0y4Tu08PIRi_cdr9rZW_QCq6hjgdnaw0w8TRSOsXdEkQFfM4/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            Name: name,
            Email: email,
            Subject: subject,
            Message: message,
          }),
        }
      )
      setSuccessMsg("Message sent successfully! We will get back to you soon.")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative z-10 overflow-hidden px-4 pb-20 pl-16 pt-28 sm:pl-20 sm:pt-32 lg:px-10 lg:pl-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(225,6,0,0.22),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            GET IN{" "}
            <span className="text-[#e10600]">TOUCH</span>
          </h1>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e10600] sm:w-24" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#e10600] shadow-[0_0_8px_rgba(225,6,0,0.7)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e10600] sm:w-24" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Have questions regarding film submissions, passes, workshop schedules, or
            festival events? Reach out directly to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-5">
            <div className="mb-1">
              <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base">
                <span className="h-4 w-1 rounded-full bg-[#e10600]" />
                Event Contacts
              </h2>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">
                Connect with the organizing team via email, phone, or visit our campus.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-sm sm:p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e10600] text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#e10600]">
                      Student Coordinators
                    </p>
                    <h3 className="text-sm font-semibold text-white">Call Event Organizers</h3>
                  </div>
                  <div className="space-y-2">
                    {contacts.map((c) => (
                      <div
                        key={c.tel}
                        className="flex flex-col gap-2 rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-[11px] text-zinc-500">{c.role}</p>
                          <p className="text-sm font-semibold text-white">{c.name}</p>
                        </div>
                        <a
                          href={`tel:${c.tel}`}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#e10600] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ff1a1a]"
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

            <div className="rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-sm sm:p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e10600] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#e10600]">
                      Official Emails
                    </p>
                    <h3 className="text-sm font-semibold text-white">General &amp; Entry Queries</h3>
                  </div>
                  <div className="space-y-2">
                    {emails.map((item) => (
                      <div
                        key={item.address}
                        className="rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2.5"
                      >
                        <p className="text-[11px] text-zinc-500">{item.label}</p>
                        <a
                          href={`mailto:${item.address}`}
                          className="mt-0.5 inline-block break-all text-sm font-semibold text-zinc-200 transition hover:text-[#e10600]"
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
            <div className="relative overflow-hidden rounded-2xl border border-[#8F742E]/40 bg-black/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-7 md:p-8">
              <div className="mb-6">
                <h2 className="mb-1.5 text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
                  Send A{" "}
                  <span className="bg-gradient-to-r from-[#c45a12] via-[#e8a04a] to-[#f3d7a1] bg-clip-text text-transparent">
                    Message
                  </span>
                </h2>
                <p className="text-sm text-zinc-500">
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
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      <User className="h-3.5 w-3.5 text-[#e10600]" />
                      Name <span className="text-[#e10600]">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Full Name"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A74E]/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      <Mail className="h-3.5 w-3.5 text-[#e10600]" />
                      Email <span className="text-[#e10600]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A74E]/70"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <Tag className="h-3.5 w-3.5 text-[#e10600]" />
                    Subject <span className="text-[#e10600]">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Inquiry Subject (e.g. Film Submission, Passes)"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A74E]/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <MessageSquare className="h-3.5 w-3.5 text-[#e10600]" />
                    Message <span className="text-[#e10600]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Write your query or message here..."
                    className="w-full resize-y rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A74E]/70"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9b0c0c] via-[#c41212] to-[#e10600] py-3.5 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_rgba(225,6,0,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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
