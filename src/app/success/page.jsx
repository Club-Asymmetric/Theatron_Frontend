"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState("Processing your registration...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");
    const event = params.get("event");
    const name = params.get("name");
    const phone = params.get("phone");
    const email = params.get("email");
    const college = params.get("college");

    if (paymentStatus === "success") {
      // ✅ Register participant
      fetch(`https://theatron-backend.onrender.com/register/solo/${event}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, college })
      })
        .then((res) => res.text())
        .then(() =>
          fetch("https://theatron-backend.onrender.com/mail/send_mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: email })
          })
        )
        .then(() => setStatus("✅ Registration confirmed! Confirmation email sent."))
        .catch(() =>
          setStatus("⚠️ Payment successful, but registration/email failed. Contact support.")
        );
    } else {
      setStatus("❌ Payment verification failed. Please contact support.");
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-center px-6">
      <h1 className="text-4xl font-bold mb-4">3D PRINTING WORKSHOP</h1>
      <p className="text-lg text-red-400">{status}</p>
      <a href="/" className="mt-6 bg-red-600 px-6 py-3 rounded hover:bg-red-700">Back to Home</a>
    </main>
  );
}
