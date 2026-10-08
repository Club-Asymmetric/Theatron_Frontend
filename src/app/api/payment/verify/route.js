const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://theatron-backend.onrender.com"

export async function POST(request) {
  try {
    const body = await request.text()
    const response = await fetch(`${BACKEND_URL}/payment/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    })

    const text = await response.text()
    return new Response(text, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
    })
  } catch (error) {
    console.error("Payment verification proxy failed:", error)
    return Response.json(
      { message: "Payment verification service is starting up or temporarily unavailable. Please try again in a few seconds." },
      { status: 502 }
    )
  }
}
