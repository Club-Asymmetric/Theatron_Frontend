import Link from "next/link"
import { Mail, Phone, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="theatron-footer" aria-label="Site footer">
      <div className="theatron-footer-inner">
        {/* Top 3-Column Showcase Grid */}
        <div className="theatron-footer-grid">
          {/* Column 1: Created by */}
          <div className="theatron-footer-created">
            <span className="theatron-footer-kicker">HOSTED &amp; CREATED BY</span>
            <div className="theatron-footer-brand-lockup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Asymmetric_logo.png"
                alt="Club Asymmetric"
                className="theatron-footer-logo"
              />
              <div className="theatron-footer-asymmetric-text">
                <span className="theatron-footer-asymmetric-name">CLUB ASYMMETRIC</span>
                <span className="theatron-footer-asymmetric-sub">CIT Innovation Cell</span>
              </div>
            </div>
          </div>

          {/* Column 2: Center Presenters */}
          <div className="theatron-footer-center">
            <div className="theatron-footer-presenters">
              <span className="theatron-footer-presenter-badge">IMMERSE</span>
              <span className="theatron-footer-presenter-cross">×</span>
              <span className="theatron-footer-presenter-badge">RESOLUTION</span>
            </div>
            <p className="theatron-footer-institution">Chennai Institute of Technology</p>
            <p className="theatron-footer-tag">Cinema &amp; Performing Arts Festival</p>
          </div>

          {/* Column 3: Copyright & Legal */}
          <div className="theatron-footer-right">
            <p className="theatron-footer-copyright">&copy; 2026 THEATRON</p>
            <p className="theatron-footer-rights">ALL RIGHTS RESERVED</p>
            <div className="theatron-footer-legal-links">
              <Link href="#terms" className="theatron-footer-legal-link">
                TERMS
              </Link>
              <span className="theatron-footer-legal-dot">&bull;</span>
              <Link href="#privacy" className="theatron-footer-legal-link">
                PRIVACY
              </Link>
            </div>
          </div>
        </div>

        {/* Regal Gradient Hairline Divider */}
        <div className="theatron-footer-divider" />

        {/* Bottom Bar: Contact & Social */}
        <div className="theatron-footer-bottom">
          <div className="theatron-footer-contacts">
            <a href="mailto:immersecit@gmail.com" className="theatron-footer-contact-item">
              <Mail className="h-4 w-4 text-red-500" />
              <span>immersecit@gmail.com</span>
            </a>
            <a href="tel:+917904849032" className="theatron-footer-contact-item">
              <Phone className="h-4 w-4 text-[#d8b979]" />
              <span>+91 7904849032</span>
            </a>
          </div>

          <a
            href="https://www.instagram.com/immerse_cit"
            target="_blank"
            rel="noreferrer"
            className="theatron-footer-instagram"
            aria-label="Follow Immerse CIT on Instagram"
          >
            <Instagram className="h-4 w-4 text-red-500" />
            <span>@immerse_cit</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
