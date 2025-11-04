"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function CinePulseRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    short_flim_link: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const res = await loadRazorpayScript()
    if (!res) {
      alert("Failed to load Razorpay SDK")
      setIsSubmitting(false)
      return
    }

    try {
      // Create Razorpay order from your backend
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 150,
          currency: "INR",
          receipt: `cinepulse_${Date.now()}`,
          event: "Cine Pulse"
        }),
      })

      const data = await orderRes.json()
      if (!data.id) throw new Error("Order creation failed")

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Cine Pulse Registration",
        description: "Short Film Competition",
        order_id: data.id,
        handler: async function (response) {
          try {
            // After successful payment, store registration in backend
            const registerRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/solo/cine-pulse`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            })

            if (registerRes.ok) {
              setSubmitStatus("success")
              setFormData({ name: "", phone: "", email: "", college: "", short_flim_link: "" })
            } else {
              setSubmitStatus("error")
            }
          } catch (error) {
            console.error("Registration failed after payment:", error)
            setSubmitStatus("error")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: "#ef4444" }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Error initiating payment:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">CINE PULSE</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">SHORT FILM COMPETITION</p>
            <p className="text-gray-500 text-sm">
              This short film competition invites participants to showcase their creativity, storytelling, and cinematic vision in a max of 2 mins.
            </p>
          </div>

          <div className="border border-gray-700 p-8">
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-900 border border-green-600 text-green-200 rounded">
                Registration successful! You will receive a confirmation email shortly.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">
                Registration failed. Please try again.
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold mb-2">Participant Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter participant name"
                  required
                />
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

              <div>
                <label className="block text-sm font-bold mb-2">College</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter college name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Short Film Link</label>
                <input
                  type="url"
                  name="short_flim_link"
                  value={formData.short_flim_link}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter link to your short film (Google Drive, YouTube, etc.)"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please ensure your link is publicly accessible for viewing
                </p>
              </div>

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹150</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹150"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
