'use client'

import { useState } from "react"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import EventCard from "@/components/event-card"

export default function Events() {
  const [filter, setFilter] = useState("competition")

  const competitions = [
    {
      id: 1,
      title: "Graphics Grid",
      description:
        "Unleash your creativity through digital art and design. Create visually stunning posters that speak louder than words, combining imagination, style, and originality. Transform ideas into visuals that inspire emotion and cinematic impact.",
      entryFee: "₹150",
      image: "/graphics-design-poster.jpg",
      registrationPath: "/registration/graphics-grid",
    },
    {
      id: 2,
      title: "Stage Play",
      description:
        "Bring stories to life under the spotlight. Perform powerful dramas or lighthearted comedies that express emotion, passion, and creativity. Let your performance reflect the art of storytelling that connects deeply with every audience.",
      entryFee: "₹150",
      image: "/stage-play.jpg",
      registrationPath: "/registration/stage-play",
    },
    {
      id: 3,
      title: "Stills of Soul",
      description:
        "Capture the essence of emotion through your lens. Freeze powerful moments that tell stories words cannot. Each photograph should mirror your creative vision, turning still images into timeless expressions of cinematic storytelling.",
      entryFee: "₹150",
      image: "/still-of-soul.jpg",
      registrationPath: "/registration/stills-of-soul",
    },
    {
      id: 4,
      title: "CinePlus",
      description:
        "Craft short films that blend emotion, vision, and storytelling brilliance. From scripting to direction, bring your imagination to life on screen. Let your creativity shape narratives that touch hearts and inspire audiences.",
      entryFee: "₹150",
      image: "/cineplus.jpg",
      registrationPath: "/registration/cineplus",
    },
    {
  id: 5,
  title: "TrailCut",
  description:
    "Master the precision of cinematic editing. Create thrilling trailers that captivate viewers with energy and rhythm. Every second counts—craft motion, mood, and momentum that leaves audiences eager for more, celebrating true cinematic brilliance.",
  entryFee: "₹150",
  image: "/trailer-cut.jpg",
  registrationPath: "/registration/trail-cut",
},
{
  id: 6,
  title: "AdapTune",
  description:
    "Let rhythm and expression define your performance. Dance to cinematic tunes that combine passion, choreography, and storytelling. Move beyond beats to create an experience that connects art, energy, and raw emotion seamlessly.",
  entryFee: "₹150",
  image: "/adaptune.jpg",
  registrationPath: "/registration/adaptune",
},

    {
      id: 7,
      title: "Quizcorn",
      description:
        "Step into the world of film trivia. Test your knowledge of actors, directors, scripts, and iconic moments in cinema. Compete with fellow cinephiles and prove that your love for movies goes far beyond the screen.",
      entryFee: "₹150",
      image: "/quiz.jpg",
      registrationPath: "/registration/quizcorn",
    },
  ]

  const workshops = [
    {
      id: 1,
      title: "Script Writing",
      description:
        "Discover the fundamentals of cinematic storytelling. Learn to craft original scripts with compelling plots, powerful characters, and natural dialogue. Turn your creative thoughts into scripts ready for the big screen.",
      entryFee: "₹150",
      image: "/scriptwriting-draft.jpg",
      registrationPath: "/registration/script-writing",
    },
    {
      id: 2,
      title: "Photography Workshop",
      description:
        "Dive deep into the art and science of photography. Explore lighting, framing, and visual storytelling guided by experts. Transform everyday scenes into captivating frames that tell stories without words.",
      entryFee: "₹150",
      image: "/photography-workshop.jpg",
      registrationPath: "/registration/photography-workshop",
    },
    {
      id: 3,
      title: "3D Printing",
      description:
        "Step into the future of innovation and design. Learn how 3D printing brings imagination to life— from concept modeling to tangible creations. Build, create, and innovate using cutting-edge printing technology.",
      entryFee: "₹150",
      image: "/3d-printing.jpg",
      registrationPath: "/registration/3d-printing",
    },
  ]

  const displayedEvents = filter === "competition" ? competitions : workshops

  return (
    <main className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <Navigation />
      <Sidebar />

      {/* Events Section */}
      <section className="relative z-10 pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs tracking-widest mb-4">CHOOSE YOUR CATEGORY</p>
            <h1 className="text-6xl font-bold mb-4">EVENTS</h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="h-px w-12 bg-red-600"></div>
            </div>

            <p className="text-gray-400 text-sm tracking-wider mb-8">
              EXPLORE OUR CINEMATIC COMPETITIONS AND HANDS-ON CREATIVE WORKSHOPS
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setFilter("competition")}
                className={`px-6 py-2 rounded-full border-2 ${
                  filter === "competition"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                } transition-all duration-300`}
              >
                Competitions
              </button>
              <button
                onClick={() => setFilter("workshop")}
                className={`px-6 py-2 rounded-full border-2 ${
                  filter === "workshop"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                } transition-all duration-300`}
              >
                Workshops
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                entryFee={event.entryFee}
                image={event.image}
                registrationPath={event.registrationPath}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
