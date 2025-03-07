import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional 
            recipes served with a modern twist.
          </p>
          <Link href="/reservations" className="button button-primary">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3"
            alt="Restaurant ambiance"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}