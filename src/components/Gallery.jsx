import { useRef, useState, useEffect } from 'react'
import './Gallery.css'

// Gallery items with generated image descriptions
const galleryItems = [
  { id: 'g1', category: 'Bikes',   title: 'Custom Royal Enfield Build',   desc: 'Full custom build with exhaust and paint' },
  { id: 'g2', category: 'Bikes',   title: 'Sport Bike Modification',      desc: 'Performance upgrade & LED lighting' },
  { id: 'g3', category: 'Cars',    title: 'Car Body Restoration',         desc: 'Complete panel paint & dent removal' },
  { id: 'g4', category: 'Bikes',   title: 'Classic Bike Restoration',     desc: 'Full engine rebuild & chrome polish' },
  { id: 'g5', category: 'Cars',    title: 'Car AC Service',               desc: 'Full AC overhaul & gas refill' },
  { id: 'g6', category: 'Garage',  title: 'Our Workshop',                 desc: 'State-of-the-art service bay' },
]

// Gradient placeholder images using CSS
const placeholderGrads = [
  'linear-gradient(135deg, #1a0500, #3d0f00, #6b1a00)',
  'linear-gradient(135deg, #0a0a1a, #1a0505, #3d0a00)',
  'linear-gradient(135deg, #1a0a00, #2d0800, #5a1000)',
  'linear-gradient(135deg, #0d0000, #2a0500, #4a1205)',
  'linear-gradient(135deg, #050010, #100308, #2a0a00)',
  'linear-gradient(135deg, #0a0000, #1a0800, #300e00)',
]

const filters = ['All', 'Bikes', 'Cars', 'Garage']

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function Gallery() {
  const [sectionRef, inView] = useInView()
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === active)

  return (
    <section id="gallery" className="gallery section-pad" ref={sectionRef}>
      <div className="gallery__bg-glow" aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <div className={`gallery__header ${inView ? 'animate-in' : ''}`}>
          <span className="section-tag">✦ Our Work</span>
          <h2 className="section-title">From Our <span>Workshop</span></h2>
          <span className="fire-line" />
          <p className="section-subtitle">A glimpse of the builds, restorations, and service work we're proud of.</p>
        </div>

        {/* Filter Tabs */}
        <div className={`gallery__filters ${inView ? 'animate-in' : ''}`} role="tablist">
          {filters.map(f => (
            <button
              key={f}
              id={`gallery-filter-${f.toLowerCase()}`}
              className={`gallery__filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
              role="tab"
              aria-selected={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              id={`gallery-item-${item.id}`}
              className={`gallery__item ${inView ? 'animate-in' : ''}`}
              style={{
                '--grad': placeholderGrads[galleryItems.indexOf(item) % placeholderGrads.length],
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => setSelected(item)}
              aria-label={`View ${item.title}`}
            >
              <div className="gallery__item-bg" />
              {/* Overlay */}
              <div className="gallery__item-overlay">
                <span className="gallery__item-cat">{item.category}</span>
                <h3 className="gallery__item-title">{item.title}</h3>
                <p  className="gallery__item-desc">{item.desc}</p>
                <span className="gallery__item-zoom">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className={`gallery__cta ${inView ? 'animate-in' : ''}`} style={{ animationDelay: '0.5s' }}>
          <p>See more of our work on Instagram</p>
          <a
            id="gallery-instagram-btn"
            href="https://www.instagram.com/tn33pitshop"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          id="gallery-lightbox"
          className="gallery__lightbox"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <div className="gallery__lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="gallery__lightbox-img" style={{ background: placeholderGrads[galleryItems.indexOf(selected) % placeholderGrads.length] }}>
              <div className="gallery__lightbox-placeholder">
                <span className="gallery__lightbox-icon">🔧</span>
                <span className="gallery__lightbox-cat">{selected.category}</span>
              </div>
            </div>
            <div className="gallery__lightbox-info">
              <h3>{selected.title}</h3>
              <p>{selected.desc}</p>
            </div>
            <button id="gallery-lightbox-close" className="gallery__lightbox-close" onClick={() => setSelected(null)} aria-label="Close lightbox">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
