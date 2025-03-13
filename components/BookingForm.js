export default function BookingForm({ 
    formData, 
    onInputChange, 
    onSubmit, 
    isSubmitting, 
    availableTimes, 
    occasions 
  }) {
    return (
      <form onSubmit={onSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Choose date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={onInputChange}
            required
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
            aria-required="true"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Choose time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={onInputChange}
            required
            className="form-select"
            aria-required="true"
          >
            <option value="">Select a time</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
  
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
            onChange={onInputChange}
            required
            className="form-input"
            aria-required="true"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="occasion" className="form-label">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={onInputChange}
            required
            className="form-select"
            aria-required="true"
          >
            <option value="">Select an occasion</option>
            {occasions.map(occasion => (
              <option key={occasion.value} value={occasion.value}>
                {occasion.label}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="form-button"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
        </button>
      </form>
    );
  }