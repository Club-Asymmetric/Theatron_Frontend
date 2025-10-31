"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Verifying payment...")

  useEffect(() => {
    const verifyAndRegister = async () => {
      const payment_id = searchParams.get("payment_id")
      const order_id = searchParams.get("order_id")
      const signature = searchParams.get("signature")
      const event = searchParams.get("event") || "Unknown Event"

      // Common user details (solo or group)
      const name = searchParams.get("name")
      const phone = searchParams.get("phone")
      const email = searchParams.get("email")
      const college = searchParams.get("college")

      // Group event details (if present)
      const team_name = searchParams.get("team_name")
      const team_size = searchParams.get("team_size")
      const name1 = searchParams.get("name1")
      const name2 = searchParams.get("name2")
      const college1 = searchParams.get("college1")
      const college2 = searchParams.get("college2")

      try {
        // 1️⃣ Verify payment
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/verify_payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id, order_id, signature })
        })
        if (!verifyRes.ok) throw new Error("Verification failed")

        // 2️⃣ Detect whether it’s solo or group registration
        let registerEndpoint = ""
        let registerBody = {}

        if (team_name) {
          // Group event
          registerEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/group/${event.toLowerCase().replace(/\s+/g, "-")}`
          registerBody = {
            team_name,
            team_size,
            name1,
            college1,
            name2,
            college2,
            phone,
            email
          }
        } else {
          // Solo event
          registerEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/solo/${event.toLowerCase().replace(/\s+/g, "-")}`
          registerBody = { name, phone, email, college }
        }

        // 3️⃣ Register participant(s)
        const registerRes = await fetch(registerEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerBody)
        })
        if (!registerRes.ok) throw new Error("Registration failed")

        // 4️⃣ Send confirmation mail
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mail/send_mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: email, event })
        })

        setStatus(`✅ Payment verified and registration for ${event} completed successfully! Check your email for confirmation.`)
      } catch (err) {
        console.error(err)
        setStatus("❌ Payment verification or registration failed. Please contact support.")
      }
    }
    verifyAndRegister()
  }, [searchParams])

  const eventName = searchParams.get("event") || "Event"

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{eventName.toUpperCase()}</h1>
      <p className="text-lg text-gray-300">{status}</p>
      <a href="/" className="mt-6 text-red-500 hover:text-red-400 underline">
        Back to Home
      </a>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Processing...</h1>
          <p className="text-lg text-center text-gray-300">Please wait while we verify your payment.</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
