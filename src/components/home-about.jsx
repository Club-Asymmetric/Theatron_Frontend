import Link from "next/link"

const sponsors = ["SPONSOR ONE", "SPONSOR TWO", "SPONSOR THREE", "SPONSOR FOUR", "SPONSOR FIVE"]

export default function HomeAbout({ onRegister }) {
  const loop = [...sponsors, ...sponsors]

  return (
    <section className="home-about relative z-10 overflow-hidden px-4 pb-24 pt-20 text-center md:px-8" aria-label="About Theatron">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.22),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-8 text-xs uppercase tracking-[0.22em] text-gray-400 sm:text-sm md:text-lg">
          Celebrating creativity, cinema &amp; artistry
        </p>

        <div className="relative mx-auto mb-16 max-w-4xl rounded-xl border-4 border-red-600 p-6 text-center md:p-10">
          <div className="pointer-events-none absolute inset-1 rounded-lg border-2 border-red-400" />
          <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-red-500 md:text-xl">
            About Chennai Institute of Technology (CIT)
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
            Chennai Institute of Technology (CIT) is a premier institution dedicated to innovation, research,
            and holistic student growth. Beyond academics, CIT actively encourages creativity, cinema,
            and the performing arts, nurturing young filmmakers and storytellers. With strong industry
            partnerships and state-of-the-art infrastructure, CIT empowers students to turn ideas into
            impactful creations. As a hub of technology and artistic expression, CIT continues to inspire
            excellence in every field.
          </p>
        </div>

        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-red-600/80" />
          <div className="h-3 w-3 rounded-full bg-red-600" />
          <div className="h-px w-16 bg-red-600/80" />
        </div>

        <p className="mb-8 text-sm uppercase tracking-widest text-red-500 md:text-lg">
          Presented by our sponsors
        </p>

        <div className="relative mb-16 w-full overflow-hidden">
          <div className="sponsor-track flex items-center gap-10 whitespace-nowrap text-sm font-medium text-gray-400 md:text-base">
            {loop.map((name, index) => (
              <span key={`${name}-${index}`} className="flex items-center gap-10">
                <span>{name}</span>
                <span className="h-2 w-2 rounded-full bg-red-600" />
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRegister}
            className="rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:scale-105 md:px-10 md:text-base"
          >
            REGISTER NOW →
          </button>
          <Link
            href="/registration/general-pass"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105 md:px-10 md:text-base"
          >
            GENERAL PASS
          </Link>
        </div>
      </div>
    </section>
  )
}
