export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="mb-4 text-4xl font-bold">Registration Confirmation</h1>
      <p className="mb-6 text-gray-400">
        Registration confirmations are shown after the backend verifies payment.
      </p>
      <a href="/events" className="rounded bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700">
        Back to Events
      </a>
    </main>
  );
}
