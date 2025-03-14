import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from '../pages/reservations';

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
  test('renders without crashing', () => {
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

    expect(screen.getByText('Choose date')).toBeInTheDocument();
    expect(screen.getByText('Choose time')).toBeInTheDocument();
    expect(screen.getByText('Number of guests')).toBeInTheDocument();
    expect(screen.getByText('Occasion')).toBeInTheDocument();
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

    fireEvent.submit(screen.getByRole('button', { name: /make your reservation/i }));
    expect(mockOnSubmit).toHaveBeenCalled();
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

    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-03-16' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '19:00' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '3' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'anniversary' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.anything());
  });
});

describe('initializeTimes', () => {
  test('should return the correct initial times', () => {
    const expectedTimes = [
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ];
    expect(initializeTimes()).toEqual(expectedTimes);
  });
});

describe('updateTimes', () => {
  test('should return the same state when action type is unknown', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'unknown' };
    expect(updateTimes(initialState, action)).toEqual(initialState);
  });

  test('should return updated times for a known date', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'update', date: '2025-04-15' };
    const expectedTimes = ['18:00', '20:00'];
    expect(updateTimes(initialState, action)).toEqual(expectedTimes);
  });

  test('should return initial times for other dates', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'update', date: '2025-04-16' };
    const expectedTimes = initializeTimes();
    expect(updateTimes(initialState, action)).toEqual(expectedTimes);
  });
});
