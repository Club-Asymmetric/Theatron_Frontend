export default function Footer() {
  return (
    <footer className="theatron-footer" aria-label="Site footer">
      <div className="theatron-footer-grid">
        <div className="theatron-footer-created">
          <p>Created by</p>
          <img src="/Asymmetric_logo.png" alt="Asymmetric" />
          <span>Asymmetric</span>
        </div>

        <div className="theatron-footer-center">
          <p className="theatron-footer-brand">RESOLUTION × IMMERSE</p>
          <p>Chennai Institute of Technology</p>
        </div>

        <div className="theatron-footer-right">
          <p>&copy; 2026 THEATRON</p>
        </div>
      </div>

      <div className="theatron-footer-divider" />

      <div className="theatron-footer-contact">
        <div>
          <span>Email:</span>
          <a href="mailto:immersecit@gmail.com">immersecit@gmail.com</a>
        </div>
        <div>
          <span>Phone:</span>
          <a href="tel:+917904849032">+91 7904849032</a>
        </div>
      </div>
    </footer>
  )
}
