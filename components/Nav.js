'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-container">
        <Image 
          src="/logo.svg" 
          alt="Little Lemon" 
          width={150} 
          height={50}
          className="nav-logo"
        />
        <ul className="nav-menu">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/about" className="nav-link">About</Link></li>
          <li><Link href="/menu" className="nav-link">Menu</Link></li>
          <li><Link href="/reservations" className="nav-link">Reservations</Link></li>
          <li><Link href="/order" className="nav-link">Order Online</Link></li>
          <li><Link href="/login" className="nav-link">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}