'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    text: "The Mediterranean dishes here are absolutely authentic! The atmosphere takes you right to the heart of Greece."
  },
  {
    name: "John D.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
    text: "Best Greek salad in Chicago! The ingredients are always fresh and the service is exceptional."
  },
  {
    name: "Emily R.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    text: "The lemon dessert is to die for! It's the perfect balance of sweet and tangy."
  }
];

export default function CustomersSay() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials-title">What our customers say!</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {"★".repeat(testimonial.rating)}
              </div>
              <div className="testimonial-profile">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="testimonial-image"
                />
                <h3 className="testimonial-name">{testimonial.name}</h3>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}