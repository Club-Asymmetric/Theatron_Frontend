import { Instagram } from "lucide-react"

export default function Sidebar() {
  return (
    <a
      href="https://www.instagram.com/immerse_cit"
      target="_blank"
      rel="noreferrer"
      aria-label="Immerse on Instagram"
      className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-crimson-300/80 bg-gradient-to-b from-crimson-400 via-crimson-600 to-crimson-800 text-white shadow-[0_8px_24px_-6px_rgba(204,58,38,0.6)] transition hover:scale-105 hover:shadow-[0_10px_30px_-6px_rgba(230,84,66,0.8)] sm:bottom-auto sm:left-5 sm:right-auto sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2"
    >
      <Instagram className="h-6 w-6" strokeWidth={2.25} />
    </a>
  )
}
