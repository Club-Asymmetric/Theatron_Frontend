"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

const films = Array.from({ length: 6 }, (_, index) => ({
  src: `/img${index + 1}.jpg`,
  number: String(index + 1).padStart(2, "0"),
  title: [
    "THEATRON 2025",
    "THEATRON 2025",
    "THEATRON 2025",
    "THEATRON 2025",
    "THEATRON 2025",
    "THEATRON 2025",
  ][index],
}))

function FilmImage({ src, alt, className = "", onError }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`gallery-image ${className}`}
      onError={onError}
    />
  )
}

export default function Gallery() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [failedImages, setFailedImages] = useState({})

  const previous = () => {
    setActive((current) => (current === 0 ? films.length - 1 : current - 1))
  }

  const next = () => {
    setActive((current) => (current === films.length - 1 ? 0 : current + 1))
  }

  const markFailed = (src) => {
    setFailedImages((current) => ({ ...current, [src]: true }))
  }

  const renderImage = (film, className = "") => {
    if (failedImages[film.src]) {
      return <div className={`gallery-placeholder ${className}`}>IMAGE {film.number}</div>
    }

    return (
      <FilmImage
        src={film.src}
        alt={film.title}
        className={className}
        onError={() => markFailed(film.src)}
      />
    )
  }

  const current = films[active]
  const previousFilm = films[(active - 1 + films.length) % films.length]
  const nextFilm = films[(active + 1) % films.length]

  return (
    <section id="gallery" className="gallery-section" aria-label="Gallery">
      <div className="gallery-glow" />
      <div className="gallery-noise" />

      <div className="gallery-heading">
        <div>
          <span>THEATRON / VISUAL ARCHIVE</span>
          <h2>THE <b>GALLERY</b></h2>
        </div>
        <div className="gallery-index">
          <strong>{current.number}</strong>
          <i />
          <span>06</span>
        </div>
      </div>

      <div className="gallery-stage">
        <button className="gallery-side gallery-side-left" onClick={previous} type="button" aria-label="Previous image">
          {renderImage(previousFilm)}
          <small>{previousFilm.number}</small>
        </button>

        <div className="gallery-frame">
          <div className="gallery-corner gallery-corner-tl" />
          <div className="gallery-corner gallery-corner-br" />

          <div className="gallery-main-media">
            {renderImage(current)}
            <div className="gallery-media-shine" />
            <div className="gallery-media-overlay" />
          </div>

          <div className="gallery-caption">
            <div>
              <span>FRAME {current.number}</span>
              <h3>{current.title}</h3>
            </div>
            <button type="button" onClick={() => setLightbox(true)} aria-label="Open image fullscreen">
              <Maximize2 size={17} />
            </button>
          </div>
        </div>

        <button className="gallery-side gallery-side-right" onClick={next} type="button" aria-label="Next image">
          {renderImage(nextFilm)}
          <small>{nextFilm.number}</small>
        </button>
      </div>

      <div className="gallery-controls">
        <button type="button" className="gallery-arrow" onClick={previous} aria-label="Previous image">
          <ChevronLeft size={20} />
        </button>

        <div className="gallery-thumbnails">
          {films.map((film, index) => (
            <button
              key={film.src}
              type="button"
              className={`gallery-thumb ${index === active ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`Open frame ${film.number}`}
            >
              {renderImage(film)}
              <span>{film.number}</span>
            </button>
          ))}
        </div>

        <button type="button" className="gallery-arrow" onClick={next} aria-label="Next image">
          <ChevronRight size={20} />
        </button>
      </div>

      {lightbox && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={() => setLightbox(false)}>
          <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-close" onClick={() => setLightbox(false)} aria-label="Close fullscreen image">
              <X size={22} />
            </button>
            {renderImage(current)}
            <div>
              <span>FRAME {current.number}</span>
              <strong>{current.title}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
