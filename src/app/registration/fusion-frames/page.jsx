"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function FusionFramesRegistration() {
  const [teamSize, setTeamSize] = useState(1)
  const [formData, setFormData] = useState({
    team_name: "",
    team_size: 1,
    phone: "",
    email: ""
  })
  const [participants, setParticipants] = useState([
    { name: "", college: "" }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleTeamSizeChange = (size) => {
    setTeamSize(size)
    setFormData({ ...formData, team_size: size })
    
    // Adjust participants array
    const newParticipants = [...participants]
    if (size > participants.length) {
      // Add participants
      for (let i = participants.length; i < size; i++) {
        newParticipants.push({ name: "", college: "" })
      }
    } else {
      // Remove participants
      newParticipants.splice(size)
    }
    setParticipants(newParticipants)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants]
    newParticipants[index][field] = value
    setParticipants(newParticipants)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Build the submission data
    const submissionData = { ...formData }
    
    participants.forEach((participant, index) => {
      submissionData[`name${index + 1}`] = participant.name
      submissionData[`college${index + 1}`] = participant.college
    })

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/group/fusion-frames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          team_name: "",
          team_size: 1,
          phone: "",
          email: ""
        })
        setParticipants([{ name: "", college: "" }])
        setTeamSize(1)
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <Navigation />
      <Sidebar />

      {/* Registration Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">FUSION FRAMES</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">STAGEPLAY EVENT</p>
            <p className="text-gray-500 text-sm">This stageplay event invites participants to showcase their talent in a 3-minute performance, featuring mime, drama, dance, music, street play, dance drama, or a creative fusion of these art forms.</p>
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
                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
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
                        onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
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

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Entry Fee</span>
                  <span className="text-red-600 text-xl font-bold">₹200</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'REGISTER FOR FUSION FRAMES'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}