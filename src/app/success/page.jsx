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
      const name = searchParams.get("name")
      const phone = searchParams.get("phone")
      const email = searchParams.get("email")
      const college = searchParams.get("college")

      try {
        // 1️⃣ Verify payment
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/verify_payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id, order_id, signature })
        })
        if (!verifyRes.ok) throw new Error("Verification failed")

        // 2️⃣ Register user
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/solo/trailer-cut`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, college })
        })

        // 3️⃣ Send confirmation mail
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mail/send_mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: email, event: "Trailer Cut" })
        })

        setStatus("✅ Payment verified and registration completed successfully! Check your email for confirmation.")
      } catch (err) {
        console.error(err)
        setStatus("❌ Payment verification or registration failed. Please contact support.")
      }
    }
    verifyAndRegister()
  }, [searchParams])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">TRAILER CUT</h1>
      <p className="text-lg text-center text-gray-300">{status}</p>
      <a href="/" className="mt-6 text-red-500 hover:text-red-400 underline">
        Back to Home
      </a>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">TRAILER CUT</h1>
        <p className="text-lg text-center text-gray-300">Loading...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}