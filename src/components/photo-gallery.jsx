const images = [
  { id: 1, src: "/img1.jpg", alt: "Gallery moment 1" },
  { id: 2, src: "/img2.jpg", alt: "Gallery moment 2" },
  { id: 3, src: "/img3.jpg", alt: "Gallery moment 3" },
  { id: 4, src: "/img4.jpg", alt: "Gallery moment 4" },
  { id: 5, src: "/img5.jpg", alt: "Gallery moment 5" },
  { id: 6, src: "/img6.jpg", alt: "Gallery moment 6" },
  { id: 7, src: "/img7.jpg", alt: "Gallery moment 7" },
  { id: 10, src: "/img10.jpg", alt: "Gallery moment 10" },
  { id: 11, src: "/img11.jpg", alt: "Gallery moment 11" },
  { id: 12, src: "/img12.jpg", alt: "Gallery moment 12" },
  { id: 13, src: "/img13.jpeg", alt: "Gallery moment 13" },
  { id: 14, src: "/img14.jpeg", alt: "Gallery moment 14" },
  { id: 15, src: "/img15.jpeg", alt: "Gallery moment 15" },
  { id: 16, src: "/img16.jpeg", alt: "Gallery moment 16" },
  { id: 17, src: "/img17.jpeg", alt: "Gallery moment 17" },
  { id: 18, src: "/img18.jpeg", alt: "Gallery moment 18" },
  { id: 19, src: "/img19.jpg", alt: "Gallery moment 19" },
  { id: 20, src: "/img20.jpg", alt: "Gallery moment 20" },
  { id: 22, src: "/img22.jpg", alt: "Gallery moment 22" },
  { id: 23, src: "/img23.jpg", alt: "Gallery moment 23" },
]

export default function PhotoGallery() {
  return (
    <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="nx-rise mb-16 text-center">
          <p className="nx-eyebrow mb-5">Memories Captured</p>

          <h1 className="nx-display nx-lacquer mb-5 text-5xl font-bold sm:text-6xl">GALLERY</h1>

          <div className="nx-ornament mb-8" aria-hidden="true">
            <i />
          </div>

          <p className="text-xs tracking-wider text-stone-500 sm:text-sm">MOMENTS FROM PREVIOUS EDITIONS</p>
        </div>

        <div className="columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="nx-frame nx-rise group break-inside-avoid"
              style={{ "--i": Math.min(index, 8) }}
            >
              <div className="nx-frame-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
