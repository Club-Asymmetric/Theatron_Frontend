"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState("Processing your registration...");
  const [eventName, setEventName] = useState("Loading event...");
  const [showButton, setShowButton] = useState(false); // 👈 controls button visibility

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");
    const event = params.get("event");
    const name = params.get("name");
    const phone = params.get("phone");
    const email = params.get("email");
    const college = params.get("college");

    if (event) {
      const formattedEvent = event
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setEventName(formattedEvent);
    }

    if (paymentStatus === "success") {
      const groupEvents = ["quizcorn", "adapttune"]; // 👈 lowercase comparison
      const isGroupEvent = groupEvents.includes(event.toLowerCase());
      const apiType = isGroupEvent ? "group" : "solo";

      fetch(`https://theatron-backend.onrender.com/register/${apiType}/${event}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, college }),
      })
        .then((res) => res.text())
        .then(() =>
          fetch("https://theatron-backend.onrender.com/mail/send_mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: email }),
          })
        )
        .then(() => {
          setStatus("✅ Registration confirmed! Confirmation email sent.");
          setShowButton(true); // 👈 show button after success
        })
        .catch(() => {
          setStatus("⚠️ Payment successful, but registration/email failed. Contact support.");
          setShowButton(true); // 👈 also show button on error
        });
    } else {
      setStatus("❌ Payment verification failed. Please contact support.");
      setShowButton(true); // 👈 show button for failure
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-center px-6">
      <h1 className="text-4xl font-bold mb-4">{eventName}</h1>
      <p className="text-lg text-red-400">{status}</p>

      {/* 👇 only show button when done (success or fail) */}
      {showButton && (
        <a
          href="/"
          className="mt-6 bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Back to Home
        </a>
      )}
    </main>
  );
}
