import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const ReservationSuccess = () => {
  const containerStyle = { maxWidth: '800px', margin: '0 auto', padding: '2rem 0' };
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'var(--color-primary-green)',
    marginBottom: '1rem'
  };
  const messageStyle = {
    fontSize: '1.2rem',
    color: 'var(--color-gray-dark)',
    marginBottom: '2rem'
  };

  const detailsContainerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '2rem'
  };

  const detailItemStyle = {
    marginBottom: '0.5rem',
    fontSize: '1.1rem'
  };

  const detailLabelStyle = {
    fontWeight: 'bold',
    color: 'var(--color-primary-green)'
  };

  const detailValueStyle = {
    color: 'var(--color-gray-dark)'
  };

  const router = useRouter();
  const { query } = router;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const details = [
    { label: 'Date', value: query.date },
    { label: 'Time', value: query.time },
    { label: 'Guests', value: query.guests },
    { label: 'Occasion', value: capitalize(query.occasion) }
  ];

  const reservationDetails = (
    <ul style={{ padding: 0, listStyleType: 'none' }}>
      {details.map(detail => (
        <li key={detail.label} style={detailItemStyle}>
          <span style={detailLabelStyle}>{detail.label}:</span> <span style={detailValueStyle}>{detail.value}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Nav />
      <main className="container">
        <div style={containerStyle}>
          <h1 style={titleStyle}>Reservation Successful!</h1>
          <p style={messageStyle}>
            Thank you for your reservation at Little Lemon. We look forward to welcoming you!
          </p>
          <div style={detailsContainerStyle}>{reservationDetails}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationSuccess;
