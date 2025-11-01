"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

// Function to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function AdaptTuneRegistration() {
  const [formData, setFormData] = useState({
    team_name: "",
    team_size: 1,
    name1: "",
    college1: "",
    name2: "",
    college2: "",
    phone: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successData, setSuccessData] = useState(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [paymentInProgress, setPaymentInProgress] = useState(false)

  // Load Razorpay script
  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript()
      setRazorpayLoaded(loaded)
      if (!loaded) {
        console.error("Failed to load Razorpay script")
        toast.error("Failed to load payment system")
      }
    }
    loadScript()
  }, [])

  // Prevent navigation during payment
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (paymentInProgress) {
        e.preventDefault()
        e.returnValue = "Payment in progress. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [paymentInProgress])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "team_size" ? parseInt(value) : value
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    
    if (!razorpayLoaded) {
      toast.error("Payment system is loading. Please try again in a moment.")
      return
    }

    setIsSubmitting(true)
    setPaymentInProgress(true)
    setErrorMsg(null)

    try {
      console.log("💳 Creating payment order...")
      
      // 1️⃣ Create Razorpay order from backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/get_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: 150, 
          currency: "INR", 
          receipt: `adapt_tune_${Date.now()}` 
        })
      })
      
      const order = await res.json()
      console.log("📦 Order created:", order)

      if (!order || !order.id) {
        setErrorMsg("Failed to create payment order. Please try again.")
        toast.error("Failed to create payment order")
        setIsSubmitting(false)
        setPaymentInProgress(false)
        return
      }

      // Method to inject custom CSS to hide QR code
      const injectCustomStyles = () => {
        const style = document.createElement("style")
        style.id = "razorpay-custom-styles"
        style.textContent = `
          /* Hide QR code section */
          [data-testid="upi-qr-section"],
          .upi-qr-section,
          .qr-code-container,
          .rzp-qr-section,
          .rzp-upi-qr,
          .upi-qr-code {
            display: none !important;
          }
          
          /* Hide "Scan the QR using any UPI App" text */
          .rzp-label:contains("Scan the QR"),
          .upi-qr-label {
            display: none !important;
          }
          
          /* Make UPI ID section more prominent */
          .rzp-upi-id-section,
          .upi-id-section {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          
          /* Hide UPI app icons above QR if present */
          .rzp-upi-apps,
          .upi-apps-section {
            display: none !important;
          }
        `
        
        // Remove existing style if any
        const existingStyle = document.getElementById("razorpay-custom-styles")
        if (existingStyle) {
          existingStyle.remove()
        }
        
        document.head.appendChild(style)
      }

      // 2️⃣ Razorpay Checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CIT Immerse - Adapt Tune",
        description: "Dance Competition Registration",
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log("💳 Payment completed! Verifying...", response)
            console.log("📊 Payment response details:", {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })

            toast.success("Payment successful! Completing registration...")

            // 3️⃣ Submit registration after successful payment
            const registerRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                event: "Adapt Tune",
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                amount_paid: 150
              })
            })

            const result = await registerRes.json()
            console.log("🔍 Registration response:", result)

            if (result.success) {
              setSuccessData({
                registrationId: result.registrationId || `REG${Date.now()}`,
                payment_id: response.razorpay_payment_id,
                team_name: formData.team_name
              })
              setErrorMsg(null)
              
              toast.success(
                `Registration completed! Registration ID: ${result.registrationId || `REG${Date.now()}`}`,
                { duration: 8000 }
              )
            } else {
              setErrorMsg(result.message || "Registration failed after payment. Please contact support.")
              toast.error(result.message || "Registration failed after payment")
            }
          } catch (err) {
            console.error("Registration error:", err)
            const errorMsg = "Payment successful but registration failed. Please contact support with your payment ID: " + response.razorpay_payment_id
            setErrorMsg(errorMsg)
            toast.error(errorMsg)
          } finally {
            setIsSubmitting(false)
            setPaymentInProgress(false)
          }
        },
        prefill: {
          name: formData.name1,
          email: formData.email,
          contact: formData.phone
        },
        theme: { 
          color: "#EF4444" 
        },
        notes: {
          event: "Adapt Tune",
          team_name: formData.team_name
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled")
            setErrorMsg("Payment cancelled. Please try again.")
            setIsSubmitting(false)
            setPaymentInProgress(false)
          },
          confirm_close: true,
          escape: false,
          onload: () => {
            console.log("🎨 Razorpay modal loaded - applying custom styles")

            // Inject custom styles to hide QR code
            setTimeout(() => {
              injectCustomStyles()
            }, 500)

            // Additional attempt to hide QR elements
            setTimeout(() => {
              const qrElements = document.querySelectorAll(
                '[data-testid*="qr"], .qr-code, .rzp-qr, .upi-qr, [class*="qr"]'
              )
              qrElements.forEach((el) => {
                if (el && el.style) {
                  el.style.display = "none"
                }
              })
            }, 1000)
          }
        },
        // UPI-only method configuration
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        preferred: ["upi"],
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay using UPI ID",
                instruments: [
                  {
                    method: "upi",
                    flows: ["intent"],
                  },
                ],
              },
            },
            hide: [
              {
                method: "upi",
                flows: ["qr"],
              },
            ],
          },
        },
      }

      // 2️⃣ Open Razorpay checkout
      const razor = new window.Razorpay(options)
      
      razor.on('payment.failed', function (response) {
        console.error("❌ Payment failed:", response.error)
        const errorMsg = `Payment failed: ${response.error.description}`
        setErrorMsg(errorMsg)
        toast.error(errorMsg)
        setIsSubmitting(false)
        setPaymentInProgress(false)
      })
      
      razor.open()
      console.log("🚀 Razorpay modal opened - UPI payment flow initiated")
      
    } catch (err) {
      console.error("Payment error:", err)
      setErrorMsg("Something went wrong while starting payment. Please try again.")
      toast.error("Failed to start payment process")
      setIsSubmitting(false)
      setPaymentInProgress(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] z-0 pointer-events-none"></div>

      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">ADAPT TUNE</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">DANCE COMPETITION</p>
            <p className="text-gray-500 text-sm">
              This innovative dance competition challenges participants to adapt to musical transitions and maintain seamless, fluid movement to music provided by the organizers.
            </p>
          </div>

          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">{errorMsg}</div>}
            {successData && (
              <div className="mb-6 p-6 bg-green-900 border border-green-600 text-green-200 rounded">
                <h3 className="text-xl font-bold mb-2">✅ Registration Successful!</h3>
                <p className="mb-2"><strong>Registration ID:</strong> {successData.registrationId}</p>
                <p className="mb-2"><strong>Team Name:</strong> {successData.team_name}</p>
                <p className="mb-2"><strong>Payment ID:</strong> {successData.payment_id}</p>
                <p className="text-sm mt-4">Please save this information. A confirmation email will be sent shortly.</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={handlePayment}>
              <div>
                <label className="block text-sm font-bold mb-2">Number of Participants</label>
                <select
                  name="team_size"
                  value={formData.team_size}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
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
                  placeholder="Enter team name"
                  required
                />
              </div>

              {["name1", "college1", "name2", "college2", "phone", "email"].map((field, i) => (
                <div key={field}>
                  <label className="block text-sm font-bold mb-2 capitalize">
                    {field.includes("name") ? `Participant ${field.slice(-1)} Name` :
                     field.includes("college") ? `Participant ${field.slice(-1)} College` :
                     field === "phone" ? "Phone Number" : "Email ID"}
                    {i >= 2 && i < 4 ? <span className="text-gray-500"> (Optional)</span> : ""}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder={`Enter ${field.replace(/[0-9]/, " ").trim()}`}
                    required={i < 4 ? false : true}
                  />
                </div>
              ))}

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹150</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || successData || paymentInProgress}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {paymentInProgress ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    🔒 PAYMENT IN PROGRESS - DO NOT CLOSE
                  </>
                ) : isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESSING...
                  </>
                ) : successData ? (
                  "✅ REGISTRATION COMPLETE"
                ) : (
                  "REGISTER & PAY ₹150"
                )}
              </button>

              {!successData && (
                <div className="mt-4 p-4 bg-blue-900/30 border border-blue-600/50 rounded">
                  <p className="text-blue-300 text-sm">
                    💳 You'll be redirected to a secure Razorpay payment page. <strong>Do not close the page during payment.</strong>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
