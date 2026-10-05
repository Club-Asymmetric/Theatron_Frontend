import Link from "next/link"

export default function Footer() {
  return (
    <footer className="theatron-footer" aria-label="Site footer">
      <div className="theatron-footer-inner">
        <p className="theatron-footer-copy">
          &copy; 2026 THEATRON. ALL RIGHTS RESERVED.
        </p>

        <div className="theatron-footer-collab">
          <span>HOSTED BY</span>
          <img
            src="/Asymmetric_logo.png"
            alt="Club Asymmetric"
            className="theatron-footer-logo"
          />
        </div>

        <div className="theatron-footer-links">
          <Link href="#terms" className="theatron-footer-link">
            TERMS
          </Link>
          <span className="theatron-footer-dot">&bull;</span>
          <Link href="#privacy" className="theatron-footer-link">
            PRIVACY
          </Link>
        </div>
      </div>
    </footer>
  )
}
