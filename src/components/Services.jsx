import { useEffect, useRef, useState } from 'react'
import './Services.css'

const services = [
  {
    id: 'bike-service',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/>
        <path d="M15 6h1l3 5.5M5.5 17.5h13M8 17.5l2.5-5.5 4 2 1.5-6"/>
        <circle cx="10" cy="6" r="1"/>
      </svg>
    ),
    title: 'Bike Servicing & Repair',
    desc: 'Complete two-wheeler maintenance — engine tuning, oil changes, brakes, chain & sprocket, and full overhauls. All brands welcome.',
    tags: ['Engine Tune-up', 'Oil Change', 'Brake Repair'],
  },
  {
    id: 'car-care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 17H3a2 2 0 01-2-2v-4l1.5-4.5A2 2 0 014.4 5h15.2a2 2 0 011.9 1.5L23 11v4a2 2 0 01-2 2h-2"/>
        <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    title: 'Car Care & Maintenance',
    desc: 'Professional car servicing including AC service, battery checks, tire rotation, wheel alignment, and periodic maintenance packages.',
    tags: ['AC Service', 'Wheel Alignment', 'Battery Check'],
  },
  {
    id: 'custom-mods',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Custom Modifications',
    desc: 'Transform your ride with custom exhausts, lighting upgrades, body kits, handle bar changes, and unique aesthetic modifications.',
    tags: ['Exhaust Mods', 'LED Upgrades', 'Body Kits'],
  },
  {
    id: 'performance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Performance Upgrades',
    desc: 'Boost your vehicle\'s power and efficiency with carburetor tuning, air filter upgrades, exhaust systems, and suspension kits.',
    tags: ['Carb Tuning', 'Suspension', 'Air Filters'],
  },
  {
    id: 'accessories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    title: 'Genuine Accessories',
    desc: 'Premium accessories store with helmets, riding gear, phone mounts, seat covers, crash guards, and OEM spare parts.',
    tags: ['Helmets', 'Crash Guards', 'Spare Parts'],
  },
  {
    id: 'paint-body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor"/>
        <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    title: 'Paint & Body Work',
    desc: 'Expert paint corrections, dent removal, panel repainting, vinyl wraps, and complete body restoration for bikes and cars.',
    tags: ['Dent Removal', 'Vinyl Wrap', 'Repainting'],
  },
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

export default function Services() {
  const [sectionRef, inView] = useInView()

  return (
    <section id="services" className="services section-pad" ref={sectionRef}>
      {/* Background decoration */}
      <div className="services__bg-grid" aria-hidden="true" />
      <div className="services__bg-glow" aria-hidden="true" />

      <div className="container">
        <div className={`services__header ${inView ? 'animate-in' : ''}`}>
          <span className="section-tag">✦ What We Do</span>
          <h2 className="section-title">
            World-Class <span>Services</span>
          </h2>
          <span className="fire-line" />
          <p className="section-subtitle">
            From routine maintenance to complete custom builds — we treat every
            vehicle like it's our own. What change do you want to make to your bike?
          </p>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={`service-${svc.id}`}
              className={`service-card ${inView ? 'animate-in' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="service-card__icon-wrap">
                <div className="service-card__icon">{svc.icon}</div>
              </div>
              <h3 className="service-card__title">{svc.title}</h3>
              <p className="service-card__desc">{svc.desc}</p>
              <ul className="service-card__tags">
                {svc.tags.map(t => (
                  <li key={t} className="service-tag">{t}</li>
                ))}
              </ul>
              <div className="service-card__glow" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`services__cta ${inView ? 'animate-in' : ''}`} style={{ animationDelay: '0.6s' }}>
          <a
            id="services-whatsapp-btn"
            href="https://wa.me/918072120657?text=Hello%20TN33%20Pitshop,%20I%20want%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get a Free Quote on WhatsApp
          </a>
          <a href="tel:+918072120657" className="btn-outline" id="services-call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Now: 8072120657
          </a>
        </div>
      </div>
    </section>
  )
}
