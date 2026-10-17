import Link from "next/link"
import { ArrowRight, Sparkles, Film, Theater, Award } from "lucide-react"
import StageBackdrop from "@/components/stage-backdrop"

const sponsors = ["CIT STUDIOS", "CINEMA GUILD", "FRAMEWORK MEDIA", "CREATIVE LABS", "SOUNDCRAFT"]

const pillars = [
  { Icon: Film, title: "Cinematic Arts", sub: "Screenwriting & Direction" },
  { Icon: Theater, title: "Live Theatre", sub: "Stage Play & Expressive Drama" },
  { Icon: Award, title: "Artistic Excellence", sub: "Workshops & Industry Panels" },
]

export default function HomeAbout({ onRegister }) {
  const loop = [...sponsors, ...sponsors]

  return (
    <section className="home-about relative z-10 overflow-hidden px-4 pb-28 pt-24 text-center md:px-8" aria-label="About Theatron">
      <StageBackdrop dust={0.45} />

      <div className="relative mx-auto max-w-6xl">
        {/* Subtle royal badge */}
        <div className="nx-rise mb-6 inline-flex items-center gap-2 rounded-full border border-crimson-500/35 bg-crimson-950/40 px-5 py-2 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-crimson-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-crimson-200">
            Celebrating Creativity &amp; Cinema
          </span>
        </div>

        {/* Framed showcase card */}
        <div className="nx-panel nx-rise relative mx-auto mb-16 max-w-4xl rounded-xl p-8 text-center backdrop-blur-xl md:p-14" style={{ "--i": 1 }}>
          <h2 className="nx-display mb-6 text-2xl font-bold uppercase text-ivory md:text-3xl">
            About Chennai Institute of Technology <span className="nx-lacquer">(CIT)</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Chennai Institute of Technology (CIT) is a premier institution dedicated to innovation, research,
            and holistic student development. Beyond technical excellence, CIT actively champions cinema,
            theatre, and performing arts, empowering visionary creators and storytellers. Supported by cutting-edge
            infrastructure and creative platforms, CIT bridges imagination and stage mastery to inspire the next
            generation of creative leaders.
          </p>

          {/* Pillars of the Festival */}
          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-crimson-500/20 pt-6 sm:grid-cols-3">
            {pillars.map(({ Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center gap-2 p-3">
                <Icon className="h-6 w-6 text-crimson-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-ivory">{title}</span>
                <span className="text-[11px] text-stone-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regal Divider */}
        <div className="nx-ornament mb-14" aria-hidden="true">
          <i />
        </div>

        {/* Sponsors Ticker */}
        <p className="nx-eyebrow mb-8">Presented By Our Partners</p>

        <div className="relative mb-16 w-full overflow-hidden py-3">
          <div className="sponsor-track flex items-center gap-12 whitespace-nowrap text-sm font-semibold tracking-widest text-stone-400 md:text-base">
            {loop.map((name, index) => (
              <span key={`${name}-${index}`} className="flex items-center gap-12">
                <span className="nx-display cursor-default transition hover:text-crimson-200">{name}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-crimson-500/70" />
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={onRegister}
            className="nx-btn nx-btn-primary group rounded-full px-9 py-3.5 text-sm md:px-11 md:text-base"
          >
            <span>Register Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/registration/general-pass"
            className="nx-btn nx-btn-ghost rounded-full px-9 py-3.5 text-sm backdrop-blur-md md:px-11 md:text-base"
          >
            General Pass
          </Link>
        </div>
      </div>
    </section>
  )
}
