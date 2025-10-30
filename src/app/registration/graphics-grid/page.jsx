"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function GraphicsGridRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/solo/graphics-grid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: "", phone: "", email: "", college: "" })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
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

      {/* Registration Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">GRAPHICS GRID</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">POSTER MAKING COMPETITION</p>
            <p className="text-gray-500 text-sm">Unleash your creativity in our poster-making competition by designing original, AI-free masterpieces that reflect pure artistic expression.</p>
          </div>

          {/* Registration Form */}
          <div className="border border-gray-700 p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900 border border-green-600 text-green-200 rounded">
                Registration successful! You will receive a confirmation email shortly.
              </div>
            )}
            {submitStatus === 'error' && (
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

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Entry Fee</span>
                  <span className="text-red-600 text-xl font-bold">₹150</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'REGISTER FOR GRAPHICS GRID'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}