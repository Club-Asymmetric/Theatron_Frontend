import { Instagram } from "lucide-react"

export default function Sidebar() {
  return (
    <a
      href="https://www.instagram.com/immerse_cit"
      target="_blank"
      rel="noreferrer"
      aria-label="Immerse on Instagram"
      className="fixed left-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#e10600] text-white shadow-[0_8px_24px_rgba(225,6,0,0.35)] transition hover:scale-105 sm:left-5"
    >
      <Instagram className="h-6 w-6" strokeWidth={2.25} />
    </a>
  )
}
