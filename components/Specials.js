import Link from 'next/link';
import Image from 'next/image';
import { Bike } from 'lucide-react';

export default function Specials() {
  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header">
          <h2 className="specials-title">This week's specials!</h2>
          <Link href="/menu" className="button button-primary">
            Online Menu
          </Link>
        </div>
        <div className="specials-grid">
          <article className="special-card">
            <Image
              src="https://images.unsplash.com/photo-1551248429-40975aa4de74"
              alt="Greek salad"
              width={400}
              height={300}
            />
            <div className="special-content">
              <div className="special-header">
                <h3 className="special-title">Greek Salad</h3>
                <span className="special-price">$12.99</span>
              </div>
              <p className="special-description">
                The famous greek salad of crispy lettuce, peppers, olives and our 
                Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.
              </p>
              <Link href="/order" className="special-action">
                Order a delivery <Bike className="icon" />
              </Link>
            </div>
          </article>

          <article className="special-card">
            <Image
              src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f"
              alt="Bruschetta"
              width={400}
              height={300}
            />
            <div className="special-content">
              <div className="special-header">
                <h3 className="special-title">Bruschetta</h3>
                <span className="special-price">$5.99</span>
              </div>
              <p className="special-description">
                Our Bruschetta is made from grilled bread that has been smeared 
                with garlic and seasoned with salt and olive oil.
              </p>
              <Link href="/order" className="special-action">
                Order a delivery <Bike className="icon" />
              </Link>
            </div>
          </article>

          <article className="special-card">
            <Image
              src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81"
              alt="Lemon Dessert"
              width={400}
              height={300}
            />
            <div className="special-content">
              <div className="special-header">
                <h3 className="special-title">Lemon Dessert</h3>
                <span className="special-price">$5.00</span>
              </div>
              <p className="special-description">
                This comes straight from grandma's recipe book, every last 
                ingredient has been sourced and is as authentic as can be imagined.
              </p>
              <Link href="/order" className="special-action">
                Order a delivery <Bike className="icon" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}