'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path ? 'nav-link active' : 'nav-link';

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
          <li><Link href="/" className={isActive('/')} aria-current={router.pathname === '/' ? 'page' : undefined}>Home</Link></li>
          <li><Link href="/about" className={isActive('/about')} aria-current={router.pathname === '/about' ? 'page' : undefined}>About</Link></li>
          <li><Link href="/menu" className={isActive('/menu')} aria-current={router.pathname === '/menu' ? 'page' : undefined}>Menu</Link></li>
          <li><Link href="/reservations" className={isActive('/reservations')} aria-current={router.pathname === '/reservations' ? 'page' : undefined}>Reservations</Link></li>
          <li><Link href="/order" className={isActive('/order')} aria-current={router.pathname === '/order' ? 'page' : undefined}>Order Online</Link></li>
          <li><Link href="/login" className={isActive('/login')} aria-current={router.pathname === '/login' ? 'page' : undefined}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}