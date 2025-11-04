"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function QuizcornRegistration() {
  const [formData, setFormData] = useState({
    team_name: "",
    name1: "",
    college1: "",
    name2: "",
    college2: "",
    name3: "",
    college3: "",
    phone: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const params = new URLSearchParams({
        event: "Quizcorn",
        team_name: formData.team_name,
        name1: formData.name1,
        college1: formData.college1,
        name2: formData.name2,
        college2: formData.college2,
        name3: formData.name3,
        college3: formData.college3,
        phone: formData.phone,
        email: formData.email,
        amount: 99,
        currency: "INR",
        receipt: `quizcorn_${Date.now()}`,
        redirect: "https://theatron-nu.vercel.app/success"
      }).toString()

      window.location.href = `https://farhansohail07.github.io/Project-/payment.html?${params}`
    } catch (err) {
      console.error(err)
      setErrorMsg("Something went wrong while starting payment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none"></div>

      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">QUIZCORN</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">CINEMA QUIZ COMPETITION</p>
            <p className="text-gray-500 text-sm">
              Test your knowledge of Tamil and English cinema — from actors and directors to storylines and iconic
              moments. Form a team and compete for cinematic glory!
            </p>
          </div>

          {/* Form */}
          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">{errorMsg}</div>
            )}

            <form className="space-y-6" onSubmit={handlePayment}>
              <div>
                <label className="block text-sm font-bold mb-2">Team Name</label>
                <input
                  type="text"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  required
                />
              </div>

              {/* Team members */}
              {["1", "2", "3"].map((num, idx) => (
                <div key={num}>
                  <label className="block text-sm font-bold mb-2">
                    Participant {num} Name {idx > 0 && <span className="text-gray-500">(Optional)</span>}
                  </label>
                  <input
                    type="text"
                    name={`name${num}`}
                    value={formData[`name${num}`]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 mb-3 text-white focus:border-red-600 focus:outline-none transition"
                    required={num === "1"}
                  />
                  <label className="block text-sm font-bold mb-2">
                    Participant {num} College {idx > 0 && <span className="text-gray-500">(Optional)</span>}
                  </label>
                  <input
                    type="text"
                    name={`college${num}`}
                    value={formData[`college${num}`]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                    required={num === "1"}
                  />
                </div>
              ))}

              {/* Contact */}
              {["phone", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-bold mb-2 capitalize">
                    {field === "phone" ? "Phone Number" : "Email ID"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "tel"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                    required
                  />
                </div>
              ))}

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹99</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹99"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
