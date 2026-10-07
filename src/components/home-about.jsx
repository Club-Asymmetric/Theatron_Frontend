import Link from "next/link"
import { ArrowRight, Sparkles, Film, Theater, Award } from "lucide-react"

const sponsors = ["CIT STUDIOS", "CINEMA GUILD", "FRAMEWORK MEDIA", "CREATIVE LABS", "SOUNDCRAFT"]

export default function HomeAbout({ onRegister }) {
  const loop = [...sponsors, ...sponsors]

  return (
    <section className="home-about relative z-10 overflow-hidden px-4 pb-28 pt-24 text-center md:px-8" aria-label="About Theatron">
      {/* Cinematic ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(214,180,122,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Subtle royal badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-950/20 px-5 py-2 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-red-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">
            Celebrating Creativity &amp; Cinema
          </span>
        </div>

        {/* Main Glassmorphic Showcase Card */}
        <div className="relative mx-auto mb-16 max-w-4xl rounded-2xl border border-red-600/25 bg-gradient-to-b from-white/[0.04] via-black/40 to-black/80 p-8 text-center backdrop-blur-xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08),0_0_30px_rgba(220,38,38,0.08)] md:p-14">
          <h2 className="mb-6 font-poppins text-2xl font-bold uppercase tracking-wider text-white md:text-3xl">
            About Chennai Institute of Technology <span className="text-red-500">(CIT)</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-gray-300 sm:text-base md:text-lg">
            Chennai Institute of Technology (CIT) is a premier institution dedicated to innovation, research,
            and holistic student development. Beyond technical excellence, CIT actively champions cinema,
            theatre, and performing arts, empowering visionary creators and storytellers. Supported by cutting-edge
            infrastructure and creative platforms, CIT bridges imagination and stage mastery to inspire the next
            generation of creative leaders.
          </p>

          {/* Pillars of the Festival */}
          <div className="mt-10 grid grid-cols-1 gap-4 pt-6 border-t border-white/10 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 p-3">
              <Film className="h-6 w-6 text-red-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f7eedb]">Cinematic Arts</span>
              <span className="text-[11px] text-gray-400">Screenwriting &amp; Direction</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3">
              <Theater className="h-6 w-6 text-[#d8b979]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f7eedb]">Live Theatre</span>
              <span className="text-[11px] text-gray-400">Stage Play &amp; Expressive Drama</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3">
              <Award className="h-6 w-6 text-red-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f7eedb]">Artistic Excellence</span>
              <span className="text-[11px] text-gray-400">Workshops &amp; Industry Panels</span>
            </div>
          </div>
        </div>

        {/* Regal Divider */}
        <div className="mb-14 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-600/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-600/70" />
        </div>

        {/* Sponsors Ticker */}
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#d8b979]">
          Presented By Our Partners
        </p>

        <div className="relative mb-16 w-full overflow-hidden py-3">
          <div className="sponsor-track flex items-center gap-12 whitespace-nowrap text-sm font-semibold tracking-widest text-gray-400 md:text-base">
            {loop.map((name, index) => (
              <span key={`${name}-${index}`} className="flex items-center gap-12">
                <span className="transition hover:text-white cursor-default">{name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-600/70" />
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={onRegister}
            className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-9 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(220,38,38,0.45)] transition hover:bg-red-700 hover:scale-105 cursor-pointer md:px-11 md:text-base"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/registration/general-pass"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-9 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 cursor-pointer md:px-11 md:text-base"
          >
            GENERAL PASS
          </Link>
        </div>
      </div>
    </section>
  )
}
