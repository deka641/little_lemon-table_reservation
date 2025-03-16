import { fetchAPI, submitAPI } from '../lib/api';
import { useState, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

// Reducer to manage the state of available time slots.
const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case 'update':
    case 'initialize':
      return action.times;
    default:
      return state;
  }
};

// Default values for the reservation form.
const DEFAULT_FORM_DATA = {
  date: '',
  time: '',
  guests: 1,
  occasion: ''
};

export default function Reservations() {
  // State for reservation form data.
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  // State for the submission status.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Reducer state for available time slots.
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);
  const router = useRouter();

  // Fetch available time slots for the given date and update the state.
  const updateAvailableTimes = useCallback(async (date, actionType = 'update') => {
    try {
      const times = await fetchAPI(date);
      dispatch({ type: actionType, times });
    } catch (error) {
      console.error(`Error fetching times for date ${date}:`, error);
    }
  }, []);

  // Load initial available times when the component mounts.
  useEffect(() => {
    updateAvailableTimes(new Date(), 'initialize');
  }, [updateAvailableTimes]);

  // List of occasions for the dropdown in the form.
  const occasions = [
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Meeting' },
    { value: 'other', label: 'Other' }
  ];

  // Handler for form input changes.
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // If the date changes, fetch new available time slots.
    if (name === 'date') {
      updateAvailableTimes(new Date(value));
    }
  }, [updateAvailableTimes]);

  // Handler for form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Submitting reservation:', formData);
      const isSubmitted = await submitAPI(formData);
      if (isSubmitted) {
        // Reset form after successful submission.
        setFormData(DEFAULT_FORM_DATA);
        router.push({
          pathname: '/reservationSuccess',
          query: formData
        });
      } else {
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline style objects for better readability.
  const containerStyle = { maxWidth: '800px', margin: '0 auto', padding: '2rem 0' };
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'var(--color-primary-green)',
    marginBottom: '1rem'
  };
  const descriptionStyle = {
    fontSize: '1.2rem',
    color: 'var(--color-gray-dark)',
    marginBottom: '2rem'
  };
  const layoutStyle = { display: 'flex', gap: '2rem', alignItems: 'flex-start' };
  const formAreaStyle = { flex: '0 0 70%' };
  const timesBoxStyle = {
    flex: '0 0 30%',
    padding: '1rem',
    borderRadius: '4px',
    background: '#ffffff'
  };
  const timesTitleStyle = { fontSize: '1.5rem', marginBottom: '1rem' };
  const timesListStyle = { listStyle: 'none', padding: 0, margin: 0 };
  const timesListItemStyle = { marginBottom: '0.5rem' };

  // Determine what to display in the available times box.
  let availableTimesContent;
  if (!formData.date) {
    availableTimesContent = <p>Please select a date first.</p>;
  } else if (availableTimes && availableTimes.length > 0) {
    availableTimesContent = (
      <ul style={timesListStyle}>
        {availableTimes.map((timeSlot, index) => (
          <li key={index} style={timesListItemStyle}>{timeSlot}</li>
        ))}
      </ul>
    );
  } else {
    availableTimesContent = <p>No times available</p>;
  }

  return (
    <>
      <Nav />
      <main className="container">
        <div style={containerStyle}>
          <h1 style={titleStyle}>Reserve a Table</h1>
          <p style={descriptionStyle}>
            Please fill out the form below to make a reservation at Little Lemon. We look forward to serving you!
          </p>
          <div style={layoutStyle}>
            <div style={formAreaStyle}>
              <BookingForm 
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                availableTimes={availableTimes}
                occasions={occasions}
              />
            </div>
            <div style={timesBoxStyle} className="booking-form">
              <h2 style={timesTitleStyle}>Available Times</h2>
              {availableTimesContent}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
