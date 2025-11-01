'use client';

import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white min-h-screen overflow-hidden">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <Navigation />
      <Sidebar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-8 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <p className="text-gray-400 text-lg tracking-[0.25em] mb-10 uppercase animate-fadeIn">
            A FUSION OF FILM, PHOTOGRAPHY, ART, AND EXPRESSION
          </p>
{/* Decorative line */}
<div className="flex items-center justify-center gap-4 mb-40">
  <div className="h-px w-12 bg-red-600/80"></div>
  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
  <div className="h-px w-12 bg-red-600/80"></div>
</div>

{/* Main Title (Logo) */}
<div className="flex justify-center items-center mb-40">
  <div
    className="inline-block"
    style={{
      animation: 'bounce 2s ease-in-out infinite',
      display: 'inline-block',
    }}
  >
    <img
      src="/Theatron_Logo.png"
      alt="Theatron Logo"
      className="mx-auto drop-shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-transform duration-500"
      style={{
        width: 'clamp(350px, 45vw, 650px)',
        height: 'auto',
      }}
    />
  </div>

  <style jsx>{`
    @keyframes bounce {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `}</style>
</div>

{/* Countdown - generous gap below logo */}
<div className="mt-8 mb-20">
  <Countdown />
</div>


          {/* Secondary tagline */}
          <p className="text-gray-400 text-lg tracking-[0.25em] mb-16 uppercase">
            CELEBRATING CREATIVITY, CINEMA & ARTISTRY
          </p>

          {/* Glowing divider */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <div className="h-px w-16 bg-red-600/80"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="h-px w-16 bg-red-600/80"></div>
          </div>

          {/* Sponsors */}
          
    <div className="mb-20">
      <p className="text-center text-red-500 text-lg tracking-widest mb-8 uppercase">
        Presented By Our Sponsors
      </p>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap gap-10 items-center text-gray-400 font-medium">
          <p>SPONSOR ONE</p>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <p>SPONSOR TWO</p>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <p>SPONSOR THREE</p>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <p>SPONSOR FOUR</p>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <p>SPONSOR FIVE</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
 


          {/* CTA Buttons */}
          <div className="flex justify-center gap-8">
            <button className="relative bg-red-600 px-10 py-3 font-semibold rounded-full overflow-hidden transition-transform transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]">
              <span className="relative z-10">REGISTER NOW →</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-0 hover:opacity-100 transition-opacity"></span>
            </button>

            <Link
              href="/events"
              className="relative border border-gray-600 px-10 py-3 rounded-full font-semibold text-white transition-transform transform hover:scale-105 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              VIEW EVENTS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
