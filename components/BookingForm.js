import { useState, useEffect, useMemo, useCallback } from 'react';

export default function BookingForm({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  availableTimes,
  occasions,
}) {
  // Compute today's date in YYYY-MM-DD format to set as the minimum selectable date.
  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Ensure availableTimes is a valid array.
  const timeOptions = Array.isArray(availableTimes) ? availableTimes : [];

  // State to track overall form validity, which fields have been interacted with, and if submission was attempted.
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });
  const [dirtyFields, setDirtyFields] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Mark a field as touched when it loses focus.
  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Validate form fields whenever formData changes.
  useEffect(() => {
    console.log('Validating form data:', formData);

    const isDateValid = formData.date >= todayDate;
    const isTimeValid = formData.time !== '';
    const isGuestsValid = formData.guests >= 1 && formData.guests <= 10;
    const isOccasionValid = formData.occasion !== '';

    console.log('Validation results:', {
      isDateValid,
      isTimeValid,
      isGuestsValid,
      isOccasionValid,
    });

    setIsFormValid(isDateValid && isTimeValid && isGuestsValid && isOccasionValid);
  }, [formData, todayDate]);

  // Debugging: Log validation checks for the occasion field
  useEffect(() => {
    console.log('Occasion validation check:', {
      occasion: formData.occasion,
      isOccasionValid: formData.occasion !== '',
      touched: touchedFields.occasion
    });
  }, [formData.occasion, touchedFields.occasion]);

  // Retrieve an error message for a specific field if it has been interacted with and is invalid.
  const getFieldError = useCallback(
    (fieldName) => {
      if (!dirtyFields[fieldName]) return '';
      switch (fieldName) {
        case 'date':
          return formData.date < todayDate ? 'Please select a valid date.' : '';
        case 'time':
          return formData.time === '' ? 'Please select a time.' : '';
        case 'guests':
          return formData.guests < 1 || formData.guests > 10
            ? 'Guests must be between 1 and 10.'
            : '';
        case 'occasion':
          return formData.occasion === '' ? 'Select an occasion.' : '';
        default:
          return '';
      }
    },
    [dirtyFields, formData, todayDate]
  );

  // Handle form submission: mark all fields as touched, log debug info, and call onSubmit if the form is valid.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form validity on submit:', isFormValid);
    console.log('Touched fields:', touchedFields);
    
    if (isFormValid) {
      // Don't set all fields as touched when form is valid
      // This prevents validation errors from showing briefly
      onSubmit(event);
    } else {
      // Only set touched fields and show errors for invalid form
      setTouchedFields({
        date: true,
        time: true,
        guests: true,
        occasion: true,
      });
      setSubmitAttempted(true);
    }
  };

  // Conditionally render a general error message if the form submission was attempted and the form is invalid.
  const renderGeneralErrorMessage = () => {
    if (submitAttempted && !isFormValid) {
      console.log('Displaying general error message');
      return (
        <div className="general-error-message" style={{ color: 'red', marginBottom: '10px' }}>
          Please correct the highlighted fields before submitting.
        </div>
      );
    }
    return null;
  };

  return (
    <section aria-labelledby="booking-form-section">
      <style jsx>{`
        fieldset {
          border: none;
          margin: 0;
          padding: 0;
        }
        legend {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
      <form onSubmit={handleFormSubmit} className="booking-form" aria-label="Booking Form">
        <fieldset>
          <legend id="booking-form-section">Booking Form</legend>
          {renderGeneralErrorMessage()}
          {/* Date Selection Field */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Choose date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={(e) => { !dirtyFields.date && setDirtyFields(prev => ({...prev, date:true})); onInputChange(e); }}
              required
              className="form-input"
              min={todayDate}
              aria-required="true"
              onBlur={() => handleFieldBlur('date')}
              style={{ borderColor: getFieldError('date') ? 'red' : '#ccc' }}
              aria-label="Select a date"
            />
            {getFieldError('date') && (
              <span className="error-message">{getFieldError('date')}</span>
            )}
          </div>
          {/* Time Selection Field */}
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Choose time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={(e) => { !dirtyFields.time && setDirtyFields(prev => ({...prev, time:true})); onInputChange(e); }}
              required
              className="form-select"
              aria-required="true"
              onBlur={() => handleFieldBlur('time')}
              style={{ borderColor: getFieldError('time') ? 'red' : '#ccc' }}
              aria-label="Select a time"
            >
              <option value="">Select a time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {getFieldError('time') && (
              <span className="error-message">{getFieldError('time')}</span>
            )}
          </div>
          {/* Guests Number Input Field */}
          <div className="form-group">
            <label htmlFor="guests" className="form-label">
              Number of guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={(e) => { !dirtyFields.guests && setDirtyFields(prev => ({...prev, guests:true})); onInputChange(e); }}
              required
              className="form-input"
              aria-required="true"
              onBlur={() => handleFieldBlur('guests')}
              style={{ borderColor: getFieldError('guests') ? 'red' : '#ccc' }}
              aria-label="Enter number of guests"
            />
            {getFieldError('guests') && (
              <span className="error-message">{getFieldError('guests')}</span>
            )}
          </div>
          {/* Occasion Selection Field */}
          <div className="form-group">
            <label htmlFor="occasion" className="form-label">
              Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={(e) => { !dirtyFields.occasion && setDirtyFields(prev => ({...prev, occasion:true})); onInputChange(e); }}
              required
              className="form-select"
              aria-required="true"
              onBlur={() => handleFieldBlur('occasion')}
              style={{ borderColor: getFieldError('occasion') ? 'red' : '#ccc' }}
              aria-label="Select an occasion"
            >
              <option value="">Select an occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion.value} value={occasion.value}>
                  {occasion.label}
                </option>
              ))}
            </select>
            {getFieldError('occasion') && (
              <span className="error-message">{getFieldError('occasion')}</span>
            )}
          </div>
        </fieldset>
        {/* Submit Button */}
        <button
          type="submit"
          className="form-button"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          aria-label="Submit the booking form"
        >
          {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
        </button>
      </form>
    </section>
  );
}
