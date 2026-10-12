export async function POST(request) {
  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://theatron-backend.onrender.com"
    const response = await fetch(`${backendUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json().catch(() => ({}))
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    try {
      const fallbackResponse = await fetch("https://theatron-backend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const fallbackData = await fallbackResponse.json().catch(() => ({}))
      return new Response(JSON.stringify(fallbackData), {
        status: fallbackResponse.status,
        headers: { "Content-Type": "application/json" },
      })
    } catch (fallbackError) {
      return new Response(JSON.stringify({ error: fallbackError.message || "Failed to submit contact query" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  }
}
