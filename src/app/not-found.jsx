import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <h1 className="mb-4 text-6xl font-extrabold text-[#e10600]">404</h1>
      <h2 className="mb-2 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[#e10600] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ff1a1a]"
      >
        Return Home
      </Link>
    </main>
  )
}
