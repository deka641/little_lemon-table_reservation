import { useState } from 'react';

import Nav from '../components/Nav';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

export default function Reservations() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTimes = [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];

  const occasions = [
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Meeting' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In a real application, this would submit to an API
      console.log('Submitting reservation:', formData);
      setFormData({
        date: '',
        time: '',
        guests: 1,
        occasion: ''
      });
      alert('Reservation submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            color: 'var(--color-primary-green)',
            marginBottom: '1rem'
          }}>
            Reserve a Table
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-gray-dark)',
            marginBottom: '2rem'
          }}>
            Please fill out the form below to make a reservation at Little Lemon. 
            We look forward to serving you!
          </p>
          <BookingForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            availableTimes={availableTimes}
            occasions={occasions}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}