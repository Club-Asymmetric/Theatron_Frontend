"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"

export default function FusionFramesRegistration() {
  const [teamSize, setTeamSize] = useState(1)
  const [formData, setFormData] = useState({
    team_name: "",
    team_size: 1,
    phone: "",
    email: "",
  })
  const [participants, setParticipants] = useState([{ name: "", college: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    document.body.appendChild(script)
  }, [])

  const handleTeamSizeChange = (size) => {
    setTeamSize(size)
    setFormData((prev) => ({ ...prev, team_size: size }))
    setParticipants((prev) => {
      const newParticipants = [...prev]
      if (size > prev.length) {
        for (let i = prev.length; i < size; i++) newParticipants.push({ name: "", college: "" })
      } else {
        newParticipants.length = size
      }
      return newParticipants
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleParticipantChange = (index, field, value) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    )
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/get_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 200, currency: "INR", receipt: `fusion-frames_${Date.now()}` })
      })
      const order = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CIT Immerse - Fusion Frames",
        description: "Stageplay Event",
        order_id: order.id,
        prefill: { name: formData.team_name, email: formData.email, contact: formData.phone },
        theme: { color: "#EF4444" },
        handler: async function (response) {
          const query = new URLSearchParams({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            team_name: formData.team_name,
            team_size: teamSize,
            phone: formData.phone,
            email: formData.email
          }).toString()
          window.location.href = `/success?${query}`
        }
      }

      const razor = new window.Razorpay(options)
      razor.open()
    } catch (err) {
      console.error(err)
      setErrorMsg("Something went wrong while initiating payment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] z-0 pointer-events-none"></div>

      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">FUSION FRAMES</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">STAGEPLAY EVENT</p>
            <p className="text-gray-500 text-sm">
              This stageplay event invites participants to showcase their talent in a 3-minute performance, featuring mime, drama, dance, music, street play, dance drama, or a creative fusion of these art forms.
            </p>
          </div>

          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">{errorMsg}</div>
            )}
            <form className="space-y-6" onSubmit={handlePayment}>
              <div>
                <label className="block text-sm font-bold mb-2">Number of Participants (1-10)</label>
                <select
                  value={teamSize}
                  onChange={(e) => handleTeamSizeChange(parseInt(e.target.value))}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  required
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Team Name</label>
                <input
                  type="text"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Name of the team"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-red-600">Participant Details</h3>
                {participants.map((participant, index) => (
                  <div key={index} className="space-y-3 p-4 border border-gray-600 rounded">
                    <h4 className="font-bold text-white">
                      Participant {index + 1} {index === 0 ? "(Required)" : "(Optional)"}
                    </h4>
                    <div>
                      <label className="block text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                        placeholder={`Enter participant ${index + 1} name`}
                        required={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">College</label>
                      <input
                        type="text"
                        value={participant.college}
                        onChange={(e) => handleParticipantChange(index, "college", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                        placeholder={`Enter participant ${index + 1} college`}
                        required={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹200</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹200"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
