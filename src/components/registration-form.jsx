"use client"

import Script from "next/script"
import { useMemo, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { eventRules } from "@/data/event-rules"
import RulesModal from "@/components/rules-modal"
import StageBackdrop from "@/components/stage-backdrop"

const inputClass =
  "nx-input"

const eventDetails = {
  quizcorn: {
    title: "Quiz Corn",
    category: "Cinema quiz competition",
    description: "A three-round cinema quiz on Tamil and English movies: online MCQ preliminary, shortlist round and a rapid-fire final.",
    note: "Maximum 3 members per team. Every participant must register individually.",
    contacts: ["Charan: +91 72008 19221"],
  },
  "stills-of-soul": {
    title: "Stills of Soul",
    category: "Online photography competition",
    description: "Upload your best original shot before the deadline. The top 10 entries advance to the on-campus grand finale and feature in the Photo Exhibition.",
    extra: "drive",
    contacts: ["Dhanuj: +91 98842 78279", "Jehva: +91 82207 66200"],
  },
  "graphics-grid": {
    title: "Graphics Grid",
    category: "Online poster design competition",
    description: "Design an original poster on the theme Cinema (no AI tools). The top 10 posters are shortlisted for the final round.",
    extra: "poster",
    contacts: ["Dhanuj: +91 98842 78279", "Jehva: +91 82207 66200"],
  },
  cineplus: {
    title: "Cineplus",
    category: "Online short film competition",
    description: "Submit a short film (maximum 3 minutes) built around a Thirukkural. The top 10 are shortlisted and invited to campus; the top 3 are selected.",
    extra: "video",
    contacts: ["Dhanuj: +91 98842 78279", "Jehva: +91 82207 66200"],
  },
  "stage-play": {
    title: "Stage Play",
    category: "Theatrical competition",
    description: "Bring stories to life on stage. Teams of 1 to 10 perform within 15 minutes, curtain to curtain.",
    extra: "stageTeam",
    contacts: ["Saicharan: +91 7397 466 351"],
  },
  adaptune: {
    title: "Adaptune",
    category: "Dance competition",
    description: "Solo or duo: perform to a 2-minute mixed audio track with 2 to 4 impromptu music transitions.",
    extra: "adaptuneTeam",
    contacts: ["Deepika: +91 97890 62268"],
  },
  brainstorm: {
    title: "Brainstorm",
    category: "Screenplay competition",
    description: "Pick one of the on-the-spot loglines and write a structured screenplay in 60 to 90 minutes.",
    contacts: ["Ahilan: +91 93617 86878"],
  },
  debate: {
    title: "ThiraiVaadham",
    category: "Team debate competition",
    description: "A debate for teams of exactly 2. Round 1 topics are announced along with registration.",
    extra: "debateTeam",
    contacts: ["Keerthana: +91 94456 86514"],
  },
  photography: {
    title: "Photography",
    category: "Photography workshop",
    description: "Learn composition, camera techniques, lighting, and visual storytelling.",
    contacts: ["Mahak: +91 80895 58314"],
  },
  "vfx-and-editing": {
    title: "Beyond The Frame",
    category: "VFX and video editing workshop",
    description: "Transform creative ideas into captivating visual stories through VFX and editing.",
    contacts: ["Elankaviyan: +91 93454 27112"],
  },
  dance: {
    title: "Dance",
    category: "Dance workshop",
    description: "Explore movement, rhythm, expression, and the joy of bringing music to life.",
    contacts: ["Dhruv : +91 79040 35550"],
  },
  "script-writing": {
    title: "Script Writing",
    category: "Scriptwriting workshop",
    description: "Learn storytelling, character development, structure, and dialogue.",
    contacts: ["Dhanvant: +91 63859 11338", "Yaazir: +91 99954 59005"],
  },
  storyboard: {
    title: "Storyboard",
    category: "Storyboarding workshop",
    description: "Visualize scripts through shot composition, camera angles, framing, and scene planning.",
    contacts: ["Mitra: +91 884 883 7259", "Karuppan: +91 98847 10408"],
  },
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-crimson-200/90">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-500">{hint}</span>}
    </label>
  )
}

function ParticipantFields({ count, values, onChange }) {
  return (
    <div className="space-y-4 rounded-lg border border-crimson-500/20 bg-ink-950/60 p-4">
      <h2 className="nx-display text-lg font-bold text-crimson-200">Participant details</h2>
      {Array.from({ length: count }, (_, index) => {
        const number = index + 1
        return (
          <div className="grid gap-4 sm:grid-cols-2" key={number}>
            <Field label={`Participant ${number} name`}>
              <input
                className={inputClass}
                value={values[`participant${number}Name`] || ""}
                onChange={(event) => onChange(`participant${number}Name`, event.target.value)}
                required
              />
            </Field>
            <Field label={`Participant ${number} phone number`}>
              <input
                className={inputClass}
                type="tel"
                value={values[`participant${number}Phone`] || ""}
                onChange={(event) => onChange(`participant${number}Phone`, event.target.value)}
                required
              />
            </Field>
          </div>
        )
      })}
    </div>
  )
}

export default function RegistrationForm({ event }) {
  const details = eventDetails[event]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    teamName: "",
    teamSize:
      event === "debate"
        ? "2"
        : event === "adaptune" || event === "stage-play"
          ? "1"
          : "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(null)
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)
  const [showRules, setShowRules] = useState(false)

  const participantCount = useMemo(() => {
    if (details?.extra === "debateTeam") return Number(formData.teamSize)
    if (details?.extra === "stageTeam") return Number(formData.teamSize)
    if (details?.extra === "adaptuneTeam") return Number(formData.teamSize)
    return 0
  }, [details, formData.teamSize])

  const FEE = useMemo(() => {
    switch (event) {
      case "adaptune": return Number(formData.teamSize) === 2 ? 150 : 120;
      case "brainstorm":
      case "graphics-grid":
      case "stills-of-soul":
      case "quizcorn": return 89;
      case "cineplus": return 149;
      case "stage-play": return (Number(formData.teamSize) || 1) * 99;
      case "debate":
      case "photography": return 99;
      case "vfx-and-editing":
      case "script-writing": return 120;
      case "dance": return 150;
      case "storyboard": return 89;
      default: return 99;
    }
  }, [event, formData.teamSize]);

  if (!details) {
    return null
  }

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const validateForm = () => {
    const requiredFields = [
      ["name", "Name"],
      ["email", "Email ID"],
      ["phone", "Phone number"],
      ["college", "College name"],
      ["department", "Department"],
      ["year", "Year of study"],
    ]
    const missingField = requiredFields.find(([field]) => !String(formData[field] || "").trim())
    if (missingField) {
      return `${missingField[1]} is required.`
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Enter a valid email address."
    }
    if (!/^[+()\d\s-]{7,}$/.test(formData.phone)) {
      return "Enter a valid phone number."
    }
    if (
      (details.extra === "drive" || details.extra === "poster" || details.extra === "video") &&
      !/^https:\/\/(drive\.google\.com|docs\.google\.com)\//i.test(formData.submissionLink || "")
    ) {
      return "Enter a valid Google Drive submission URL."
    }
    if ((details.extra === "stageTeam" || details.extra === "debateTeam") && !formData.teamName?.trim()) {
      return "Team name is required."
    }
    if (details.extra === "stageTeam" && (Number(formData.teamSize) < 1 || Number(formData.teamSize) > 10)) {
      return "Stage Play teams must have 1 to 10 participants."
    }
    if (details.extra === "debateTeam" && Number(formData.teamSize) !== 2) {
      return "ThiraiVaadham teams must have exactly 2 participants."
    }
    if (details.extra === "adaptuneTeam" && ![1, 2].includes(Number(formData.teamSize))) {
      return "Adaptune must have 1 or 2 participants."
    }
    if (participantCount > 0) {
      for (let index = 1; index <= participantCount; index += 1) {
        if (!formData[`participant${index}Name`]?.trim() || !formData[`participant${index}Phone`]?.trim()) {
          return `Participant ${index} name and phone number are required.`
        }
      }
    }
    return ""
  }

  const handlePayment = async (eventObject) => {
    eventObject.preventDefault()
    setError("")
    setSuccess(null)
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!razorpayKey || (!isRazorpayReady && !window.Razorpay)) {
      setError("Payment checkout is still loading. Please try again in a moment.")
      return
    }

    setIsSubmitting(true)

    const isTeamSizeEvent = Boolean(details?.extra === "stageTeam" || details?.extra === "debateTeam" || details?.extra === "adaptuneTeam")
    const isTeamNameEvent = Boolean(details?.extra === "stageTeam" || details?.extra === "debateTeam")

    try {
      const orderPayload = {
        event,
        ...(isTeamSizeEvent ? { teamSize: formData.teamSize } : {}),
        amount: FEE,
        currency: "INR",
        receipt: `${event}_${Date.now()}`,
      }

      let response
      try {
        response = await fetch("/api/payment/get_order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        })
      } catch (localFetchErr) {
        // Fallback to direct backend call if local Next.js proxy route is unavailable
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://theatron-backend.onrender.com"
        response = await fetch(`${backendUrl}/payment/get_order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        })
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || body.message || "Unable to create the payment order.")
      }
      const order = await response.json()
      if (!order.id) {
        throw new Error("Payment service returned an invalid order.")
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "THEATRON 2026",
        description: "THEATRON 2026 Event Registration",
        order_id: order.id,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#d53422" },
        handler: async (payment) => {
          try {
            const verifyPayload = {
              event,
              ...formData,
              teamName: isTeamNameEvent ? (formData.teamName || "").trim() : "",
              teamSize: isTeamSizeEvent ? formData.teamSize : "",
              razorpay_payment_id: payment.razorpay_payment_id,
              razorpay_order_id: payment.razorpay_order_id,
              razorpay_signature: payment.razorpay_signature,
            }

            let verificationResponse
            try {
              verificationResponse = await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(verifyPayload),
              })
            } catch (localVerifyErr) {
              const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://theatron-backend.onrender.com"
              verificationResponse = await fetch(`${backendUrl}/payment/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(verifyPayload),
              })
            }

            const verificationBody = await verificationResponse.json().catch(() => ({}))
            if (verificationResponse.status === 401) {
              throw new Error("Payment verification failed. If money was deducted, please contact the organizers.")
            }
            if (verificationResponse.status === 409) {
              throw new Error("This payment has already been registered.")
            }
            if (verificationResponse.status === 400) {
              throw new Error(verificationBody.error || verificationBody.message || "Please check your registration details.")
            }
            if (!verificationResponse.ok || !verificationBody.success) {
              throw new Error(verificationBody.error || verificationBody.message || "Payment verification failed. Please contact the organizers.")
            }
            setSuccess({
              registrationId: verificationBody.registrationId,
              emailSent: verificationBody.emailSent !== false,
              message: verificationBody.message,
            })
          } catch (verificationError) {
            const msg = verificationError.message || ""
            if (msg.includes("Failed to fetch")) {
              setError("Payment verification could not reach the server. If money was deducted, please contact the organizers.")
            } else {
              setError(msg || "Payment verification failed. Please contact the organizers.")
            }
          } finally {
            setIsSubmitting(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false)
            setError("Payment was cancelled. You can edit the form and try again.")
          },
        },
      }
      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
    } catch (paymentError) {
      const msg = paymentError.message || ""
      if (msg.includes("Failed to fetch")) {
        setError("Unable to connect to the payment server. The backend server may be waking up (Render cold-start)—please wait a few seconds and try again.")
      } else {
        setError(msg || "A network error prevented payment from starting.")
      }
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="relative min-h-screen bg-ink-950 text-white">
        <Navigation />
        <StageBackdrop dust={0.35} />
        <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
          <div className="mx-auto max-w-2xl nx-panel nx-rise rounded-lg p-8 text-center">
            <h1 className="nx-display nx-lacquer mb-4 text-4xl font-bold">Payment successful</h1>
            <p className="mb-2 text-xl text-white">Registration confirmed</p>
            <p className="mb-6 text-stone-300">Registration ID: {success.registrationId}</p>
            {!success.emailSent && (
              <p className="mb-6 text-amber-300">
                Your payment and registration were successful. We could not deliver the confirmation email, but your registration is saved.
              </p>
            )}
            <a href="/events" className="nx-btn nx-btn-primary px-6 py-3 text-sm">
              Back to Events
            </a>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-ink-950 text-white">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setIsRazorpayReady(true)}
        onError={() => setError("Payment checkout could not be loaded. Please refresh and try again.")}
      />
      <Navigation />
      <StageBackdrop dust={0.35} />
      <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="nx-rise mb-10 text-center">
            <p className="nx-eyebrow mb-4">{details.category}</p>
            <h1 className="nx-display nx-lacquer mb-4 text-4xl font-bold sm:text-6xl">{details.title}</h1>
            <p className="mx-auto max-w-2xl text-stone-400">{details.description}</p>
            {details.note && (
              <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-crimson-300">{details.note}</p>
            )}
            {details.contacts && (
              <p className="mx-auto mt-4 max-w-2xl text-xs text-stone-500">
                Event contact: {details.contacts.join(" • ")}
              </p>
            )}
          </header>


          <form className="nx-panel nx-rise space-y-6 rounded-lg p-5 sm:p-8" style={{ "--i": 1 }} onSubmit={handlePayment}>
            {error && <div className="rounded-lg border border-red-500/40 bg-red-950/50 p-4 text-red-200">{error}</div>}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name"><input className={inputClass} value={formData.name} onChange={(e) => updateField("name", e.target.value)} required /></Field>
              <Field label="Email ID"><input className={inputClass} type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required /></Field>
              <Field label="Phone number"><input className={inputClass} type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} required /></Field>
              <Field label="College name"><input className={inputClass} value={formData.college} onChange={(e) => updateField("college", e.target.value)} required /></Field>
              <Field label="Department"><input className={inputClass} value={formData.department} onChange={(e) => updateField("department", e.target.value)} required /></Field>
              <Field label="Year of study"><input className={inputClass} value={formData.year} onChange={(e) => updateField("year", e.target.value)} required /></Field>
            </div>

            {details.extra === "drive" && (
              <Field label="Google Drive photo link" hint="Upload your photo to Google Drive and enable viewer access before submitting.">
                <input className={inputClass} type="url" value={formData.submissionLink || ""} onChange={(e) => updateField("submissionLink", e.target.value)} required />
              </Field>
            )}
            {(details.extra === "poster" || details.extra === "video") && (
              <Field
                label={details.extra === "poster" ? "Poster submission link (Google Drive)" : "Short film submission link (Google Drive)"}
                hint={details.extra === "poster" ? "Upload to Google Drive with viewer access. Accepted formats: JPG, JPEG, PNG, or PDF." : "Upload to Google Drive with viewer access. The film must not exceed 3 minutes."}
              >
                <input className={inputClass} type="url" value={formData.submissionLink || ""} onChange={(e) => updateField("submissionLink", e.target.value)} required />
              </Field>
            )}
            {details.extra === "stageTeam" && (
              <>
                <Field label="Team Name">
                  <input className={inputClass} type="text" placeholder="Enter your team name" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} required />
                </Field>
                <Field label="Number of participants in the team">
                  <select className={inputClass} value={formData.teamSize} onChange={(e) => updateField("teamSize", e.target.value)}>
                    {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} participant{i === 0 ? "" : "s"}</option>)}
                  </select>
                </Field>
                <ParticipantFields count={participantCount} values={formData} onChange={updateField} />
              </>
            )}
            {details.extra === "debateTeam" && (
              <>
                <Field label="Team Name">
                  <input className={inputClass} type="text" placeholder="Enter your team name" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} required />
                </Field>
                <Field label="Team size" hint="Each team must have exactly 2 members.">
                  <input className={inputClass} value="2 participants" readOnly disabled />
                </Field>
                <ParticipantFields count={participantCount} values={formData} onChange={updateField} />
              </>
            )}
            {details.extra === "adaptuneTeam" && (
              <>
                <Field label="Participation Type">
                  <select className={inputClass} value={formData.teamSize} onChange={(e) => updateField("teamSize", e.target.value)}>
                    <option value="1">Solo (₹120)</option>
                    <option value="2">Duo (₹150)</option>
                  </select>
                </Field>
                <ParticipantFields count={participantCount} values={formData} onChange={updateField} />
              </>
            )}

            <div className="flex flex-col gap-4 border-t border-crimson-500/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-stone-500">REGISTRATION FEE</p>
                <p className="nx-display text-2xl font-bold text-crimson-300">₹{FEE}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {eventRules[event] && (
                  <button
                    type="button"
                    className="nx-btn nx-btn-ghost px-6 py-3 text-sm"
                    onClick={() => setShowRules(true)}
                  >
                    VIEW RULES
                  </button>
                )}
                <button className="nx-btn nx-btn-primary px-8 py-3 text-sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "PROCESSING..." : `REGISTER & PAY ₹${FEE}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {showRules && eventRules[event] && (
        <RulesModal rules={eventRules[event]} onClose={() => setShowRules(false)} />
      )}
      <Footer />
    </main>
  )
}
