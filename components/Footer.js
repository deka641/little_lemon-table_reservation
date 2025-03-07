import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Main Street</p>
          <p>Chicago, IL 60601</p>
          <p>Tel: (312) 555-0123</p>
          <p>Email: info@littlelemon.com</p>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 11am - 10pm</p>
          <p>Saturday: 11am - 11pm</p>
          <p>Sunday: 11am - 9pm</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/reservations">Book a Table</Link></li>
            <li><Link href="/order">Order Online</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <Link href="https://facebook.com">Facebook</Link>
            <Link href="https://instagram.com">Instagram</Link>
            <Link href="https://twitter.com">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}