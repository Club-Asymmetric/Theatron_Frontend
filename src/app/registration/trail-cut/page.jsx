"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import {useState} from "react"

export default function TrailCut(){
  const [formData,setFormData]=useState({name:"",phone:"",email:"",college:""})
  const [isSubmitting,setIsSubmitting]=useState(false)

  const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setIsSubmitting(true)

    const params=new URLSearchParams({
      event:"TrailerCut",
      description:"Cinematic Trailer Editing Competition",
      amount:"150",
      name:formData.name,
      phone:formData.phone,
      email:formData.email,
      college:formData.college,
      redirect:"https://theatron-nu.vercel.app/success/trailcut"
    }).toString()

    window.location.href=`https://farhansohail07.github.io/Project-/payment.html?${params}`
  }

  return(
    <main className="bg-black text-white min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] z-0 pointer-events-none"></div>

      <Navigation/>
      <Sidebar/>

      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">TRAILCUT</h1>
          <p className="text-red-600 text-sm tracking-wider mb-4">CINEMATIC TRAILER EDITING COMPETITION</p>
          <p className="text-gray-500 text-sm">
            Master the precision of cinematic editing. Create thrilling trailers that captivate viewers with rhythm,
            emotion, and creativity that celebrates true cinematic brilliance.
          </p>
        </div>

        <div className="max-w-2xl mx-auto border border-gray-700 p-8 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {["name","phone","email","college"].map((field)=>(
              <div key={field}>
                <label className="block text-sm font-bold mb-2 capitalize">{field}</label>
                <input
                  type={field==="email"?"email":field==="phone"?"tel":"text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 rounded text-white focus:border-red-600 focus:outline-none transition"
                />
              </div>
            ))}
            <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
              <span className="text-lg font-bold">Entry Fee</span>
              <span className="text-red-600 text-xl font-bold">₹150</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 px-6 py-3 rounded text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
            >
              {isSubmitting?"REDIRECTING...":"REGISTER & PAY ₹150"}
            </button>
            <div className="text-red-600 text-lg font-bold">
                Note:- Please fill out the form below after registering to complete your setup.<br/>
                <a href="https://forms.gle/VwM2xUqfiEwypB7h6" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Trail Cut Form</a>
            </div>
          </form>
        </div>
      </section>

      <Footer/>
    </main>
  )
}
