import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

// Mock data and functions
const mockFormData = {
  date: new Date().toISOString().split('T')[0], // Ensure date is today or in the future
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders form elements correctly', () => {
      expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
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
  });

  describe('Interactions', () => {
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
  });

  describe('Edge Cases', () => {
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

  describe('Form Validation', () => {
    test('displays validation message for invalid date', () => {
      fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-03-15' } });
      fireEvent.blur(screen.getByLabelText(/choose date/i));
      // Wait for validation message to appear
      expect(screen.findByText(/please select a valid date/i)).resolves.toBeInTheDocument();
    });

    test('displays validation message for invalid time', () => {
      fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '' } });
      fireEvent.blur(screen.getByLabelText(/choose time/i));
      // Wait for validation message to appear
      expect(screen.findByText(/please select a time/i)).resolves.toBeInTheDocument();
    });

    test('displays validation message for invalid number of guests', () => {
      fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '0' } });
      fireEvent.blur(screen.getByLabelText(/number of guests/i));
      // Wait for validation message to appear
      expect(screen.findByText(/guests must be between 1 and 10/i)).resolves.toBeInTheDocument();
    });

    test('displays validation message for invalid occasion', () => {
      fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: '' } });
      fireEvent.blur(screen.getByLabelText(/occasion/i));
      // Wait for validation message to appear
      expect(screen.findByText(/please select an occasion/i)).resolves.toBeInTheDocument();
    });
  });
});