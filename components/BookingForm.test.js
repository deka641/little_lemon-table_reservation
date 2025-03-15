import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

// Mock data and functions
const mockFormData = {
  date: '2025-03-15',
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

// Test suite
describe('BookingForm Component', () => {
  beforeEach(() => {
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
  });

  test('renders form elements correctly', () => {
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });

  test('calls onInputChange when inputs change', () => {
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-03-16' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '19:00' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '3' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'anniversary' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());
  });

  test('calls onSubmit when form is submitted', () => {
    fireEvent.submit(screen.getByRole('button', { name: /make your reservation/i }));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('disables submit button when submitting', () => {
    render(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={true}
        availableTimes={mockAvailableTimes}
        occasions={mockOccasions}
      />
    );
    const submitButton = screen.getByRole('button', { name: /submitting/i });
    expect(submitButton).toBeDisabled();
  });

  test('renders all available times correctly', () => {
    mockAvailableTimes.forEach(time => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  test('renders all occasion options', () => {
    mockOccasions.forEach(occasion => {
      expect(screen.getByText(occasion.label)).toBeInTheDocument();
    });
  });

  // Additional Tests
  test('handles invalid date input', () => {
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());
  });

  test('handles boundary number of guests', () => {
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '1' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '10' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());
  });

  test('updates available times when props change', () => {
    const { rerender } = render(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        availableTimes={mockAvailableTimes}
        occasions={mockOccasions}
      />
    );
    // Ensure all props are passed during rerender
    rerender(
      <BookingForm
        formData={mockFormData}
        onInputChange={mockOnInputChange}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        availableTimes={['21:00', '22:00']}
        occasions={mockOccasions}
      />
    );
    expect(screen.getByText('21:00')).toBeInTheDocument();
    expect(screen.getByText('22:00')).toBeInTheDocument();
  });
});