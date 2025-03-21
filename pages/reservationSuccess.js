import React from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Inline style objects defined outside the component for improved performance and readability
const CONTAINER_STYLE = { 
  maxWidth: '800px', 
  margin: '0 auto', 
  padding: '2rem 0' 
};

const TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontSize: '3rem',
  color: 'var(--color-primary-green)',
  marginBottom: '1rem'
};

const MESSAGE_STYLE = {
  fontSize: '1.2rem',
  color: 'var(--color-gray-dark)',
  marginBottom: '2rem'
};

const DETAILS_CONTAINER_STYLE = {
  backgroundColor: '#f9f9f9',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginTop: '2rem'
};

const DETAIL_ITEM_STYLE = {
  marginBottom: '0.5rem',
  fontSize: '1.1rem'
};

const DETAIL_LABEL_STYLE = {
  fontWeight: 'bold',
  color: 'var(--color-primary-green)'
};

const DETAIL_VALUE_STYLE = {
  color: 'var(--color-gray-dark)'
};

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const ReservationSuccess = () => {
  // Retrieve query parameters from Next.js router
  const { query } = useRouter();
  const { date, time, guests, occasion } = query;

  // Ensure occasion is defined before capitalizing
  const formattedOccasion = occasion ? capitalizeFirstLetter(occasion) : 'N/A';

  // Create an array of reservation details to be displayed
  const reservationDetails = [
    { label: 'Date', value: date || 'N/A' },
    { label: 'Time', value: time || 'N/A' },
    { label: 'Guests', value: guests || 'N/A' },
    { label: 'Occasion', value: formattedOccasion }
  ];

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="container" aria-labelledby="reservation-success-title">
        <div style={CONTAINER_STYLE}>
          <h1 id="reservation-success-title" style={TITLE_STYLE}>Reservation Successful!</h1>
          <p style={MESSAGE_STYLE}>
            Thank you for your reservation at Little Lemon. We look forward to welcoming you!
          </p>
          <section style={DETAILS_CONTAINER_STYLE} aria-label="Reservation Details" aria-live="polite">
            {/* Render reservation details as a list */}
            <ul style={{ padding: 0, listStyleType: 'none' }}>
              {reservationDetails.map((detail) => (
                <li key={detail.label} style={DETAIL_ITEM_STYLE} aria-label={detail.label}>
                  <span style={DETAIL_LABEL_STYLE}>{detail.label}:</span>{' '}
                  <span style={DETAIL_VALUE_STYLE}>{detail.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ReservationSuccess;
