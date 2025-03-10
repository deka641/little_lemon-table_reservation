import Image from 'next/image';

export default function Chicago() {
  return (
    <section className="chicago">
      <div className="container chicago-container">
        <div className="chicago-content">
          <h2 className="chicago-title">Little Lemon</h2>
          <h3 className="chicago-subtitle">Chicago</h3>
          <p className="chicago-text">
            Little Lemon opened in 1995 by two Italian brothers, Adrian and Mario. 
            Despite the city's diversity, the two brothers recognized the lack of 
            Mediterranean cuisine in Chicago, and were inspired to bring the flavors 
            of their hometown in Italy to the people of Chicago.
          </p>
          <p className="chicago-text">
            The two brothers continue to oversee the Little Lemon restaurant, nearly 
            thirty years later. Their commitment to fresh, authentic Mediterranean 
            cuisine, warm hospitality, and a welcoming atmosphere has made Little 
            Lemon a beloved Chicago institution.
          </p>
        </div>
        <div className="chicago-images">
          <Image
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Little Lemon restaurant interior"
            width={400}
            height={500}
            className="chicago-image"
          />
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Little Lemon restaurant exterior"
            width={400}
            height={500}
            className="chicago-image"
          />
        </div>
      </div>
    </section>
  );
}