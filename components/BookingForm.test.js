import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

// Mock data and functions
const today = new Date().toISOString().split('T')[0];
const mockFormData = {
  date: today,
  time: '18:00',
  guests: '2',
  occasion: 'birthday',
};

const mockAvailableTimes = ['18:00', '19:00', '20:00'];
const mockOccasions = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
];

const mockOnInputChange = jest.fn();
const mockOnSubmit = jest.fn();

describe('BookingForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields and the submit button', () => {
    render(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        availableTimes={mockAvailableTimes}
        occasions={mockOccasions}
      />
    );

    // Check for form fields
    expect(screen.getByLabelText(/select a date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select a time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enter number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select an occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit the booking form/i })).toBeInTheDocument();
  });

  test('calls onInputChange when inputs change', () => {
    render(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        availableTimes={mockAvailableTimes}
        occasions={mockOccasions}
      />
    );

    // Simulate input changes
    fireEvent.change(screen.getByLabelText(/select a date/i), {
      target: { value: '2025-03-20' },
    });
    fireEvent.change(screen.getByLabelText(/select a time/i), {
      target: { value: '19:00' },
    });
    fireEvent.change(screen.getByLabelText(/enter number of guests/i), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText(/select an occasion/i), {
      target: { value: 'anniversary' },
    });

    // Verify onInputChange is called
    expect(mockOnInputChange).toHaveBeenCalledTimes(4);
  });

  test('calls onSubmit when form is submitted', () => {
    render(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        availableTimes={mockAvailableTimes}
        occasions={mockOccasions}
      />
    );

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /submit the booking form/i }));

    // Verify onSubmit is called
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
