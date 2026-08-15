import { useRef, useState, useEffect } from 'react'
import './About.css'

const features = [
  { icon: '🔧', title: 'Expert Technicians', desc: 'Highly trained mechanics with 8+ years of hands-on experience.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Most services completed same day without compromising quality.' },
  { icon: '💎', title: 'Genuine Parts', desc: 'Only OEM and quality-certified parts used for every repair.' },
  { icon: '📍', title: 'Prime Location', desc: 'Conveniently located at Erode Fort with easy parking access.' },
]

function useInView(threshold = 0.15) {
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

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="about section-pad" ref={ref}>
      <div className="about__bg-glow" aria-hidden="true" />
      <div className="container about__grid">
        {/* Left: Visual */}
        <div className={`about__visual ${inView ? 'animate-in' : ''}`}>
          <div className="about__img-frame">
            <img src="/banner.png" alt="TN 33 Pitshop garage interior" className="about__img" loading="lazy" />
            <div className="about__img-overlay" aria-hidden="true" />
          </div>

          {/* Floating badge */}
          <div className="about__badge">
            <span className="about__badge-icon">🏆</span>
            <div>
              <strong>Since 2016</strong>
              <span>Trusted by 500+ riders</span>
            </div>
          </div>

          {/* Accent label */}
          <div className="about__accent-label">
            <span>TN 33</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className={`about__content ${inView ? 'animate-in' : ''}`}>
          <span className="section-tag">✦ Our Story</span>
          <h2 className="section-title">
            More Than a Shop —<br />
            <span>A Garage with Soul</span>
          </h2>
          <span className="fire-line" />

          <p className="about__text">
            Founded in Erode, TN 33 Pitshop has been the trusted destination
            for bike and car owners across Tamil Nadu for over 8 years. We
            started with a simple belief: every vehicle deserves expert care,
            and every rider deserves honest service.
          </p>
          <p className="about__text">
            Whether you're riding a classic Royal Enfield or a modern sports
            bike, bringing in a hatchback or an SUV — our team brings the same
            passion and precision to every job.
          </p>

          <div className="about__features">
            {features.map(f => (
              <div key={f.title} className="about__feature">
                <span className="about__feature-icon">{f.icon}</span>
                <div>
                  <strong className="about__feature-title">{f.title}</strong>
                  <p className="about__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about__ctas">
            <a
              id="about-location-btn"
              href="https://maps.google.com/?q=Brough+Rd,+Muthuram+complex,+Erode+Fort,+Erode,+Tamil+Nadu+638001"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
