import StageBackdrop from "@/components/stage-backdrop"

export default function SuccessPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center text-white">
      <StageBackdrop dust={0.4} />
      <div className="nx-rise relative">
        <h1 className="nx-display nx-lacquer mb-4 text-4xl font-bold">Registration Confirmation</h1>
        <p className="mb-8 text-stone-400">
          Registration confirmations are shown after the backend verifies payment.
        </p>
        <a href="/events" className="nx-btn nx-btn-primary rounded px-6 py-3 text-sm">
          Back to Events
        </a>
      </div>
    </main>
  );
}
