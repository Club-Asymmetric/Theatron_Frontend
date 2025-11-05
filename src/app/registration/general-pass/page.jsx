"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function GeneralPass() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", department: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    // Field validation
    const { name, phone, email, department } = formData
    if (!name || !phone || !email || !department) {
      setErrorMsg("Please fill out all required fields before proceeding.")
      setIsSubmitting(false)
      return
    }

    if (!email.endsWith("@citchennai.net")) {
      setErrorMsg("Only CIT students with '@citchennai.net' email are allowed.")
      setIsSubmitting(false)
      return
    }

    try {
      const params = new URLSearchParams({
        event: "General_Pass",
        name,
        phone,
        email,
        department,
        amount: 89,
        currency: "INR",
        receipt: `generalpass_${Date.now()}`,
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]"></div>
      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">GENERAL PASS</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">EXCLUSIVE FOR CIT STUDENTS</p>
            <p className="text-gray-500 text-sm">
              Get your general entry pass to all on-campus events. Only CIT students with valid institutional email IDs are eligible.
            </p>
          </div>

          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">
                {errorMsg}
              </div>
            )}

            <form className="space-y-6 text-left" onSubmit={handlePayment}>
              {["name", "phone", "email", "department"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-bold mb-2 capitalize text-left">{field}</label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  />
                </div>
              ))}

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹89</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹89"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
