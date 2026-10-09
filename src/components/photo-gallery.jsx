const images = [
  { id: 1, src: "/img1.jpg", alt: "Gallery moment 1" },
  { id: 2, src: "/img2.jpg", alt: "Gallery moment 2" },
  { id: 3, src: "/img3.jpg", alt: "Gallery moment 3" },
  { id: 4, src: "/img4.jpg", alt: "Gallery moment 4" },
  { id: 5, src: "/img5.jpg", alt: "Gallery moment 5" },
  { id: 6, src: "/img6.jpg", alt: "Gallery moment 6" },
  { id: 7, src: "/img7.jpg", alt: "Gallery moment 7" },
  { id: 8, src: "/img8.jpg", alt: "Gallery moment 8" },
  { id: 9, src: "/img9.jpg", alt: "Gallery moment 9" },
  { id: 10, src: "/img10.jpg", alt: "Gallery moment 10" },
  { id: 11, src: "/img11.jpg", alt: "Gallery moment 11" },
  { id: 12, src: "/img12.jpg", alt: "Gallery moment 12" },
  { id: 13, src: "/img13.jpeg", alt: "Gallery moment 13" },
  { id: 14, src: "/img14.jpeg", alt: "Gallery moment 14" },
  { id: 15, src: "/img15.jpeg", alt: "Gallery moment 15" },
  { id: 16, src: "/img16.jpeg", alt: "Gallery moment 16" },
  { id: 17, src: "/img17.jpeg", alt: "Gallery moment 17" },
  { id: 18, src: "/img18.jpeg", alt: "Gallery moment 18" },
]

export default function PhotoGallery() {
  return (
    <section className="relative z-10 px-4 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-8 flex justify-center">
            <div className="border-2 border-red-600 px-6 py-3">
              <p className="text-xs tracking-widest text-red-600">MEMORIES CAPTURED</p>
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-bold sm:text-6xl">GALLERY</h1>

          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-red-600" />
            <div className="h-3 w-3 rounded-full bg-red-600" />
            <div className="h-px w-12 bg-red-600" />
          </div>

          <p className="text-xs tracking-wider text-gray-500 sm:text-sm">MOMENTS FROM PREVIOUS EDITIONS</p>
        </div>

        <div className="columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="group break-inside-avoid overflow-hidden rounded-xl border-2 border-red-600"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
