"use client"

import Script from "next/script"
import { useMemo, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const FEE = 99

const inputClass =
  "w-full rounded border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-red-600"

const eventDetails = {
  quizcorn: {
    title: "Quiz Corn",
    category: "Cinema quiz competition",
    description: "Explore films, actors, directors, music, and more in this engaging cinema quiz.",
    contacts: ["Charan: +91 72008 19221"],
  },
  "stills-of-soul": {
    title: "Stills of Soul",
    category: "Online photography competition",
    description: "Submit your best photograph online. The top 10 teams will be shortlisted for the college round.",
    extra: "drive",
    contacts: ["Dhanuj: +91 98842 78279", "Jeevaghan: +91 82207 66200"],
  },
  "graphics-grid": {
    title: "Graphics Grid",
    category: "Online poster design competition",
    description: "Submit your best poster design online. The top 10 teams will be shortlisted for the college round.",
    extra: "poster",
    contacts: ["Dhanuj: +91 98842 78279", "Jeevaghan: +91 82207 66200"],
  },
  cineplus: {
    title: "Cineplus",
    category: "Online short film competition",
    description: "Submit a short film online. The top 3 teams will be selected and awarded at CIT.",
    extra: "video",
    contacts: ["Dhanuj: +91 98842 78279", "Jeevaghan: +91 82207 66200"],
  },
  "stage-play": {
    title: "Stage Play",
    category: "Theatrical competition",
    description: "Bring stories to life through creative scripts, expressive dialogue, and dynamic stage performances.",
    extra: "stageTeam",
    contacts: ["Sai Charan: +91 7397 466 351"],
  },
  adaptune: {
    title: "Adaptune",
    category: "Dance competition",
    description: "Adapt your moves to randomly changing songs and showcase your spontaneity and versatility.",
    contacts: ["Deepika: +91 97890 62268"],
  },
  brainstorm: {
    title: "Brainstorm",
    category: "Screenplay competition",
    description: "Develop a unique logline into a structured screenplay.",
    contacts: ["Ahilan: +91 93617 86878"],
  },
  debate: {
    title: "Debate",
    category: "Team debate competition",
    description: "Tackle topics revealed on the spot and demonstrate knowledge, spontaneity, and communication.",
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
    title: "VFX and Editing",
    category: "VFX and video editing workshop",
    description: "Transform creative ideas into captivating visual stories through VFX and editing.",
    contacts: ["Elankaviyan: +91 93454 27112"],
  },
  dance: {
    title: "Dance",
    category: "Dance workshop",
    description: "Explore movement, rhythm, expression, and the joy of bringing music to life.",
    contacts: ["Overall queries: Harivarman +91 96773 21266"],
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
      <span className="mb-2 block text-sm font-bold text-gray-200">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  )
}

function ParticipantFields({ count, values, onChange }) {
  return (
    <div className="space-y-4 rounded border border-gray-800 bg-gray-950 p-4">
      <h2 className="text-lg font-bold text-white">Participant details</h2>
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
    teamSize: event === "debate" ? "2" : "2",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(null)
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)

  const participantCount = useMemo(() => {
    if (details?.extra === "debateTeam") return Number(formData.teamSize)
    if (details?.extra === "stageTeam") return Number(formData.teamSize)
    return 0
  }, [details, formData.teamSize])

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
    if (details.extra === "drive" && !/^https:\/\/drive\.google\.com\//i.test(formData.submissionLink || "")) {
      return "Enter a valid Google Drive submission URL."
    }
    if ((details.extra === "poster" || details.extra === "video") && !formData.submissionLink?.trim()) {
      return `${details.extra === "poster" ? "Poster" : "Video"} submission URL is required.`
    }
    if (details.extra === "stageTeam" && (Number(formData.teamSize) < 2 || Number(formData.teamSize) > 10)) {
      return "Stage Play teams must have 2 to 10 participants."
    }
    if (details.extra === "debateTeam" && ![2, 3, 4].includes(Number(formData.teamSize))) {
      return "Debate teams must have 2, 3, or 4 participants."
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
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !isRazorpayReady || !window.Razorpay) {
      setError("Payment checkout is still loading. Please try again in a moment.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/payment/get_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event,
          amount: FEE,
          currency: "INR",
          receipt: `${event}_${Date.now()}`,
        }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || "Unable to create the payment order.")
      }
      const order = await response.json()
      if (!order.id) {
        throw new Error("Payment service returned an invalid order.")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "THEATRON 2026",
        description: "THEATRON 2026 Event Registration",
        order_id: order.id,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#e10600" },
        handler: async (payment) => {
          try {
            const verificationResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event,
                ...formData,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_signature: payment.razorpay_signature,
              }),
            })
            const verificationBody = await verificationResponse.json().catch(() => ({}))
            if (verificationResponse.status === 401) {
              throw new Error("Payment verification failed. If money was deducted, please contact the organizers.")
            }
            if (verificationResponse.status === 409) {
              throw new Error("This payment has already been registered.")
            }
            if (verificationResponse.status === 400) {
              throw new Error(verificationBody.message || "Please check your registration details.")
            }
            if (!verificationResponse.ok || !verificationBody.success) {
              throw new Error("Payment verification failed. Please contact the organizers.")
            }
            setSuccess({
              registrationId: verificationBody.registrationId,
              emailSent: verificationBody.emailSent !== false,
              message: verificationBody.message,
            })
          } catch (verificationError) {
            setError(verificationError.message || "Payment verification failed. Please contact the organizers.")
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
      new window.Razorpay(options).open()
    } catch (paymentError) {
      setError(paymentError.message || "A network error prevented payment from starting.")
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <main className="relative min-h-screen bg-black text-white">
        <Navigation />
        <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
          <div className="mx-auto max-w-2xl rounded-lg border border-green-700 bg-gray-950 p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-green-400">Payment successful</h1>
            <p className="mb-2 text-xl text-white">Registration confirmed</p>
            <p className="mb-6 text-gray-300">Registration ID: {success.registrationId}</p>
            {!success.emailSent && (
              <p className="mb-6 text-amber-300">
                Your payment and registration were successful. We could not deliver the confirmation email, but your registration is saved.
              </p>
            )}
            <a href="/events" className="inline-block bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700">
              Back to Events
            </a>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setIsRazorpayReady(true)}
        onError={() => setError("Payment checkout could not be loaded. Please refresh and try again.")}
      />
      <Navigation />
      <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <p className="mb-3 text-sm uppercase tracking-widest text-red-600">{details.category}</p>
            <h1 className="mb-4 text-4xl font-bold sm:text-6xl">{details.title}</h1>
            <p className="mx-auto max-w-2xl text-gray-400">{details.description}</p>
            {details.contacts && (
              <p className="mx-auto mt-4 max-w-2xl text-xs text-gray-500">
                Event contact: {details.contacts.join(" • ")}
              </p>
            )}
          </header>

          <form className="space-y-6 rounded-lg border border-gray-700 bg-gray-950 p-5 sm:p-8" onSubmit={handlePayment}>
            {error && <div className="rounded border border-red-600 bg-red-950 p-4 text-red-200">{error}</div>}

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
                label={details.extra === "poster" ? "Poster submission link" : "Three-minute video submission link"}
                hint={details.extra === "poster" ? "Accepted formats: JPG, JPEG, PNG, or PDF." : "The video must be no longer than 3 minutes and accessible to the event team."}
              >
                <input className={inputClass} type="url" value={formData.submissionLink || ""} onChange={(e) => updateField("submissionLink", e.target.value)} required />
              </Field>
            )}
            {details.extra === "stageTeam" && (
              <>
                <Field label="Number of participants in the team">
                  <select className={inputClass} value={formData.teamSize} onChange={(e) => updateField("teamSize", e.target.value)}>
                    {Array.from({ length: 9 }, (_, i) => <option key={i + 2} value={i + 2}>{i + 2} participants</option>)}
                  </select>
                </Field>
                <ParticipantFields count={participantCount} values={formData} onChange={updateField} />
              </>
            )}
            {details.extra === "debateTeam" && (
              <>
                <Field label="Team size">
                  <select className={inputClass} value={formData.teamSize} onChange={(e) => updateField("teamSize", e.target.value)}>
                    {[2, 3, 4].map((size) => <option key={size} value={size}>{size} participants</option>)}
                  </select>
                </Field>
                <ParticipantFields count={participantCount} values={formData} onChange={updateField} />
              </>
            )}

            <div className="flex flex-col gap-4 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">REGISTRATION FEE</p>
                <p className="text-2xl font-bold text-red-600">₹{FEE}</p>
              </div>
              <button className="bg-red-600 px-8 py-3 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹99"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  )
}
