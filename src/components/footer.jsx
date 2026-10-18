import Link from "next/link"
import { Mail, Phone, Instagram } from "lucide-react"

// The two presenting clubs, each with its own point of contact.
const clubs = [
  {
    name: "Immerse",
    email: "immersecit@gmail.com",
    phone: "+91 63790 41919",
    tel: "+916379041919",
    person: "Hariharran",
    instagram: "immerse_cit",
  },
  {
    name: "Resolution",
    email: "resolution@citchennai.net",
    phone: "+91 80725 07323",
    tel: "+918072507323",
    person: "Dharsan",
    instagram: "team_resolution.cit",
  },
]

const explore = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="theatron-footer" aria-label="Site footer">
      <div className="theatron-footer-glow" aria-hidden="true" />

      <div className="theatron-footer-inner">
        {/* Curtain call masthead */}
        <div className="theatron-footer-masthead">
          <p className="nx-eyebrow">Curtain Call</p>
          <p className="theatron-footer-wordmark nx-display nx-lacquer">THEATRON</p>
          <p className="theatron-footer-tagline">
            Cinema &amp; Performing Arts Festival <span aria-hidden="true">·</span> Chennai Institute of Technology
          </p>
          <div className="nx-ornament" aria-hidden="true">
            <i />
          </div>
        </div>

        <div className="theatron-footer-grid">
          {/* Hosted by */}
          <div className="theatron-footer-col">
            <h2 className="theatron-footer-heading">Hosted &amp; Created By</h2>
            <div className="theatron-footer-brand-lockup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Asymmetric_logo.png" alt="Club Asymmetric" className="theatron-footer-logo" />
              <div className="theatron-footer-asymmetric-text">
                <span className="theatron-footer-asymmetric-name">Club Asymmetric</span>
                <span className="theatron-footer-asymmetric-sub">CIT Technical Club</span>
              </div>
            </div>
          </div>

          {/* Presented by */}
          <div className="theatron-footer-col">
            <h2 className="theatron-footer-heading">Presented By</h2>
            <p className="theatron-footer-presenters">
              <span className="theatron-footer-presenter-badge">Immerse</span>
              <span className="theatron-footer-presenter-cross" aria-label="and">×</span>
              <span className="theatron-footer-presenter-badge">Resolution</span>
            </p>
            <p className="theatron-footer-note">Cinema, theatre &amp; the stories in between.</p>
          </div>

          {/* Explore */}
          <nav className="theatron-footer-col" aria-label="Footer">
            <h2 className="theatron-footer-heading">Explore</h2>
            <ul className="theatron-footer-links">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="theatron-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div className="theatron-footer-col">
            <h2 className="theatron-footer-heading">Get In Touch</h2>
            {clubs.map((club) => (
              <div key={club.name} className="theatron-footer-club">
                <h3 className="theatron-footer-club-name">{club.name}</h3>
                <ul className="theatron-footer-contacts">
                  <li>
                    <a href={`mailto:${club.email}`} className="theatron-footer-contact-item">
                      <Mail className="h-4 w-4 shrink-0 text-crimson-300" />
                      <span>{club.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${club.tel}`} className="theatron-footer-contact-item">
                      <Phone className="h-4 w-4 shrink-0 text-crimson-300" />
                      <span>
                        {club.phone} ({club.person})
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.instagram.com/${club.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="theatron-footer-instagram"
                      aria-label={`Follow ${club.name} on Instagram`}
                    >
                      <Instagram className="h-4 w-4 text-crimson-300" />
                      <span>@{club.instagram}</span>
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="theatron-footer-bottom">
          <p className="theatron-footer-copyright">&copy; 2026 Theatron. All rights reserved.</p>
          <div className="theatron-footer-legal-links">
            <Link href="#terms" className="theatron-footer-legal-link">
              Terms
            </Link>
            <span className="theatron-footer-legal-dot" aria-hidden="true">
              &bull;
            </span>
            <Link href="#privacy" className="theatron-footer-legal-link">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
