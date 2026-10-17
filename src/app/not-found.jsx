import Link from "next/link"
import StageBackdrop from "@/components/stage-backdrop"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-4 text-center text-white">
      <StageBackdrop dust={0.4} />
      <div className="nx-rise relative">
        <p className="nx-eyebrow mb-4">The stage is empty</p>
        <h1 className="nx-display nx-lacquer mb-4 text-7xl font-bold">404</h1>
        <h2 className="nx-display mb-2 text-2xl font-bold text-ivory">Page Not Found</h2>
        <p className="mx-auto mb-8 max-w-md text-stone-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="nx-btn nx-btn-primary rounded-xl px-6 py-3 text-sm">
          Return Home
        </Link>
      </div>
    </main>
  )
}
