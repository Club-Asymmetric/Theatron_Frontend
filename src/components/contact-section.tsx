"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  Loader2,
  Instagram,
  Share2,
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
      role: "Overall Student Coordinator",
      name: "Santhosh Kumar",
      phone: "+91 79048 49032",
      tel: "+917904849032",
    },
    {
      role: "Event & Registrations Lead",
      name: "Venkatesh R",
      phone: "+91 98849 12815",
      tel: "+919884912815",
    },
  ]

  const emails = [
    { label: "General & Entry Queries", address: "immersecit@gmail.com" },
    { label: "Official Support & Helpdesk", address: "theatroncit@gmail.com" },
  ]

  const socialLinks = [
    {
      name: "Immerse Instagram",
      handle: "@immerse_cit",
      url: "https://www.instagram.com/immerse_cit?igsh=bmpiOWtmM29xcXZn",
    },
    {
      name: "Resolution Instagram",
      handle: "@resolution_cit",
      url: "https://www.instagram.com/resolution_cit",
    },
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
    <section className="relative z-10 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,167,78,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,17,17,0.14),transparent_55%)] pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-[#8F742E]/50 text-[#D4B76A] text-xs sm:text-sm font-bold tracking-widest uppercase mb-5 backdrop-blur-md shadow-[0_0_10px_rgba(201,167,78,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A74E]" />
          <span>THEATRON FESTIVAL HELP DESK</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F1111] via-[#A31621] to-[#D4B76A] drop-shadow-[0_0_15px_rgba(201,167,78,0.25)]">TOUCH</span>
        </h1>

        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#8F1111] to-[#C9A74E]" />
          <div className="w-2 h-2 bg-[#C9A74E] rounded-full shadow-[0_0_8px_rgba(201,167,78,0.5)]" />
          <div className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#8F1111] to-[#C9A74E]" />
        </div>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Have questions regarding film submissions, passes, workshop schedules, or festival events? Reach out directly to our team.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Event Contacts */}
        <div className="lg:col-span-5 space-y-5">
          <div className="mb-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-white flex items-center gap-2.5">
              <span className="w-2 h-5 bg-gradient-to-b from-[#D4B76A] via-[#C9A74E] to-[#8F1111] rounded-full" />
              Event Contacts
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Connect with the organizing team via email, phone, or visit our campus.
            </p>
          </div>

          {/* Coordinators Card */}
          <div className="group relative bg-zinc-950/90 border border-[#8F742E]/40 hover:border-[#C9A74E]/70 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_14px_rgba(201,167,78,0.15)] backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#650000] to-[#8F1111] border border-[#C9A74E]/50 rounded-xl text-[#D4B76A] shrink-0">
                <Phone className="w-5 h-5 text-[#D4B76A]" />
              </div>
              <div className="space-y-3 min-w-0 flex-1">
                <div>
                  <p className="text-xs uppercase font-extrabold tracking-widest text-[#D4B76A]">Student Coordinators</p>
                  <h3 className="text-base font-semibold text-white">Call Event Organizers</h3>
                </div>
                <div className="space-y-2">
                  {contacts.map((c, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-zinc-900/80 border border-[#8F742E]/30">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{c.role}</p>
                        <p className="text-sm font-semibold text-white">{c.name}</p>
                      </div>
                      <a
                        href={`tel:${c.tel}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D4B76A] hover:text-white transition-colors bg-[#8F1111]/40 px-3 py-1.5 rounded-lg border border-[#C9A74E]/40 hover:bg-[#8F1111] shrink-0 mt-1 sm:mt-0"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="group relative bg-zinc-950/90 border border-[#8F742E]/40 hover:border-[#C9A74E]/70 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_14px_rgba(201,167,78,0.15)] backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#650000] to-[#8F1111] border border-[#C9A74E]/50 rounded-xl text-[#D4B76A] shrink-0">
                <Mail className="w-5 h-5 text-[#D4B76A]" />
              </div>
              <div className="space-y-3 min-w-0 flex-1">
                <div>
                  <p className="text-xs uppercase font-extrabold tracking-widest text-[#D4B76A]">Official Emails</p>
                  <h3 className="text-base font-semibold text-white">General &amp; Entry Queries</h3>
                </div>
                <div className="space-y-2">
                  {emails.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/80 border border-[#8F742E]/30">
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <a
                        href={`mailto:${item.address}`}
                        className="inline-block text-sm font-semibold text-[#D4B76A] hover:text-white transition-colors break-all mt-0.5"
                      >
                        {item.address}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="group relative bg-zinc-950/90 border border-[#8F742E]/40 hover:border-[#C9A74E]/70 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_14px_rgba(201,167,78,0.15)] backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#650000] to-[#8F1111] border border-[#C9A74E]/50 rounded-xl text-[#D4B76A] shrink-0">
                <Share2 className="w-5 h-5 text-[#D4B76A]" />
              </div>
              <div className="space-y-3 min-w-0 flex-1">
                <div>
                  <p className="text-xs uppercase font-extrabold tracking-widest text-[#D4B76A]">Social Media</p>
                  <h3 className="text-base font-semibold text-white">Follow Festival Updates</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-[#8F742E]/30 hover:border-[#C9A74E]/70 text-gray-300 hover:text-[#D4B76A] transition-all"
                    >
                      <Instagram className="w-4 h-4 text-[#D4B76A] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate text-white">{s.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="group relative bg-zinc-950/90 border border-[#8F742E]/40 hover:border-[#C9A74E]/70 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_14px_rgba(201,167,78,0.15)] backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#650000] to-[#8F1111] border border-[#C9A74E]/50 rounded-xl text-[#D4B76A] shrink-0">
                <MapPin className="w-5 h-5 text-[#D4B76A]" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-xs uppercase font-extrabold tracking-widest text-[#D4B76A]">Campus Venue</p>
                <h3 className="text-base font-semibold text-white">Chennai Institute of Technology</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Sarathy Nagar, Kundrathur, Chennai - 600069, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>

          {/* Desk Hours Card */}
          <div className="group relative bg-zinc-950/90 border border-[#8F742E]/40 hover:border-[#C9A74E]/70 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_14px_rgba(201,167,78,0.15)] backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#650000] to-[#8F1111] border border-[#C9A74E]/50 rounded-xl text-[#D4B76A] shrink-0">
                <Clock className="w-5 h-5 text-[#D4B76A]" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-xs uppercase font-extrabold tracking-widest text-[#D4B76A]">Desk Hours</p>
                <h3 className="text-base font-semibold text-white">Monday – Saturday</h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  9:00 AM – 6:00 PM IST (Active during Fest Days)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="relative bg-zinc-950/95 border border-[#8F742E]/50 hover:border-[#C9A74E]/70 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-black/80 backdrop-blur-xl overflow-hidden transition-all duration-300">
            {/* Form Ambient Warm Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C9A74E]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-white mb-2">
                Send A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F1111] via-[#A31621] to-[#D4B76A]">Message</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Fill out the form below and our festival team will respond as soon as possible.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Status Messages */}
              {successMsg && (
                <div className="flex items-start gap-3 p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm sm:text-base backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}
              {errorMsg && (
                <div className="flex items-start gap-3 p-4 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-sm sm:text-base backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8F1111]" />
                    Name <span className="text-[#C9A74E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Full Name"
                    className="w-full bg-zinc-900/90 border border-[#8F742E]/50 focus:border-[#C9A74E] focus:ring-1 focus:ring-[#C9A74E]/25 rounded-xl px-4 py-3 text-white placeholder-zinc-500 transition-all outline-none text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8F1111]" />
                    Email <span className="text-[#C9A74E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-zinc-900/90 border border-[#8F742E]/50 focus:border-[#C9A74E] focus:ring-1 focus:ring-[#C9A74E]/25 rounded-xl px-4 py-3 text-white placeholder-zinc-500 transition-all outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8F1111]" />
                  Subject <span className="text-[#C9A74E]">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Inquiry Subject (e.g. Film Submission, Passes)"
                  className="w-full bg-zinc-900/90 border border-[#8F742E]/50 focus:border-[#C9A74E] focus:ring-1 focus:ring-[#C9A74E]/25 rounded-xl px-4 py-3 text-white placeholder-zinc-500 transition-all outline-none text-sm sm:text-base"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8F1111]" />
                  Message <span className="text-[#C9A74E]">*</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Write your query or message here..."
                  className="w-full bg-zinc-900/90 border border-[#8F742E]/50 focus:border-[#C9A74E] focus:ring-1 focus:ring-[#C9A74E]/25 rounded-xl px-4 py-3 text-white placeholder-zinc-500 transition-all outline-none text-sm sm:text-base resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#650000] via-[#780000] to-[#8F1111] hover:from-[#780000] hover:to-[#A31621] text-[#D4B76A] font-extrabold py-4 px-8 rounded-xl tracking-wider uppercase flex items-center justify-center gap-2 border border-[#C9A74E]/60 hover:border-[#D4B76A] shadow-[0_0_14px_rgba(143,17,17,0.3)] hover:shadow-[0_0_18px_rgba(201,167,78,0.25)] transition-all duration-300 hover:scale-[1.005] active:scale-[0.995] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#D4B76A]" />
                    <span>SENDING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#D4B76A]" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
