"use client"

import { useState } from "react"
import EventCard from "@/components/event-card"

const competitions = [
  {
    id: 1,
    title: "Graphics Grid",
    description:
      "Unleash your creativity through digital art and design. Create visually stunning posters that speak louder than words, combining imagination, style, and originality. Transform ideas into visuals that inspire emotion and cinematic impact.",
    entryFee: "₹89 / head",
    image: "/graphics-design-poster.jpg",
    registrationPath: "/registration/graphics-grid",
  },
  {
    id: 2,
    title: "Stage Play",
    description:
      "Bring stories to life under the spotlight. Perform powerful dramas or lighthearted comedies that express emotion, passion, and creativity. Let your performance reflect the art of storytelling that connects deeply with every audience.",
    entryFee: "₹99 / head",
    image: "/stage-play.jpg",
    registrationPath: "/registration/stage-play",
  },
  {
    id: 3,
    title: "Stills of Soul",
    description:
      "Capture the essence of emotion through your lens. Freeze powerful moments that tell stories words cannot. Each photograph should mirror your creative vision, turning still images into timeless expressions of cinematic storytelling.",
    entryFee: "₹89 / head",
    image: "/still-of-soul.jpg",
    registrationPath: "/registration/stills-of-soul",
  },
  {
    id: 4,
    title: "CinePlus",
    description:
      "Craft short films that blend emotion, vision, and storytelling brilliance. From scripting to direction, bring your imagination to life on screen. Let your creativity shape narratives that touch hearts and inspire audiences.",
    entryFee: "₹149 / head",
    image: "/cine-pulse.jpg",
    registrationPath: "/registration/cineplus",
  },
  {
    id: 6,
    title: "AdapTune",
    description:
      "Let rhythm and expression define your performance. Dance to cinematic tunes that combine passion, choreography, and storytelling. Move beyond beats to create an experience that connects art, energy, and raw emotion seamlessly.",
    entryFee: "Solo ₹120 / Duo ₹150",
    image: "/adapttune.jpg",
    registrationPath: "/registration/adaptune",
  },
  {
    id: 7,
    title: "Quizcorn",
    description:
      "Step into the world of film trivia. Test your knowledge of actors, directors, scripts, and iconic moments in cinema. Compete with fellow cinephiles and prove that your love for movies goes far beyond the screen.",
    entryFee: "₹89 / head",
    image: "/quiz.jpg",
    registrationPath: "/registration/quizcorn",
  },
  {
    id: 9,
    title: "Brainstorm",
    description:
      "Develop a unique logline into a structured screenplay and turn an idea into a compelling cinematic story.",
    entryFee: "₹89 / head",
    image: "/scriptwriting-draft.png",
    registrationPath: "/registration/brainstorm",
  },
  {
    id: 10,
    title: "Debate",
    description:
      "Teams of four tackle topics revealed on the spot, testing knowledge, spontaneity, and communication.",
    entryFee: "₹99 / team",
    image: "/stage-play.jpg",
    registrationPath: "/registration/debate",
  },
]

const workshops = [
  {
    id: 1,
    title: "Script Writing",
    description:
      "Discover the fundamentals of cinematic storytelling. Learn to craft original scripts with compelling plots, powerful characters, and natural dialogue. Turn your creative thoughts into scripts ready for the big screen.",
    entryFee: "₹120 / head",
    image: "/scriptwriting-draft.png",
    registrationPath: "/registration/script-writing",
  },
  {
    id: 2,
    title: "Photography Workshop",
    description:
      "Dive deep into the art and science of photography. Explore lighting, framing, and visual storytelling guided by experts. Transform everyday scenes into captivating frames that tell stories without words.",
    entryFee: "₹99 / head",
    image: "/photography-workshop.png",
    registrationPath: "/registration/photography",
  },
  {
    id: 3,
    title: "Dance Workshop",
    description:
      "Move to the rhythm and express yourself through dance! Join our workshop to learn choreography, stage presence, and performance techniques from talented instructors. Perfect for beginners and enthusiasts alike.",
    entryFee: "₹150 / head",
    image: "/danceworkshop.jpg",
    registrationPath: "/registration/dance",
  },
  {
    id: 7,
    title: "VFX and Editing",
    description:
      "Transform creative ideas into captivating visual stories through the art of VFX and video editing.",
    entryFee: "₹120 / head",
    image: "/cine-pulse.jpg",
    registrationPath: "/registration/vfx-and-editing",
  },
  {
    id: 8,
    title: "Storyboard",
    description:
      "Visualize scripts through shot composition, camera angles, framing, and scene-by-scene planning.",
    entryFee: "₹89 / head",
    image: "/scriptwriting-draft.png",
    registrationPath: "/registration/storyboard",
  },
]

export default function EventsSection() {
  const [filter, setFilter] = useState("competition")

  const displayedEvents = filter === "competition" ? competitions : workshops

  return (
    <section className="relative z-10 pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-red-600 text-xs tracking-widest mb-4">CHOOSE YOUR CATEGORY</p>
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">EVENTS</h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-red-600" />
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <div className="h-px w-12 bg-red-600" />
        </div>

        <p className="text-gray-400 text-xs sm:text-sm tracking-wider mb-8 max-w-2xl mx-auto">
          EXPLORE OUR CINEMATIC COMPETITIONS AND HANDS-ON CREATIVE WORKSHOPS
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setFilter("competition")}
            className={`px-6 py-2 rounded-full border-2 text-sm sm:text-base font-semibold cursor-pointer ${
              filter === "competition"
                ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
            } transition-all duration-300`}
          >
            Competitions
          </button>
          <button
            type="button"
            onClick={() => setFilter("workshop")}
            className={`px-6 py-2 rounded-full border-2 text-sm sm:text-base font-semibold cursor-pointer ${
              filter === "workshop"
                ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
            } transition-all duration-300`}
          >
            Workshops
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
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
    </section>
  )
}
