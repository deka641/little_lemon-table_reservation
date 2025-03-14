import { initializeTimes, updateTimes } from '../pages/reservations';

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
