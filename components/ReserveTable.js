'use client';

export default function ReserveTable() {
    return (
      <>
        <main className="container py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-medium mb-8">Reserve a Table</h1>
            <form className="space-y-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  id="time"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium mb-2">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="10"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="occasion" className="block text-sm font-medium mb-2">Occasion</label>
                <select id="occasion" className="w-full p-2 border rounded-md">
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="button button-primary w-full">
                Reserve Now
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }