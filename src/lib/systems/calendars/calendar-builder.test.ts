import { expect, test, describe, it } from 'vitest';
import { CalendarBuilder } from './calendar-builder';

describe('Calendar Builder', () => {
  test('should return an empty calendar without crashing', () => {
    expect(() => {
      const calendar = CalendarBuilder.from().build();
    }).not.toThrow();
  });

  test('should return a calendar with a name', () => {
    const calendar = CalendarBuilder.from().withName('Example Calendar').build();
    expect(calendar.name).toBe('Example Calendar');
  });

  test('should return a calendar with a description', () => {
    const calendar = CalendarBuilder.from().withDescription('This is an example calendar.').build();
    expect(calendar.description).toBe('This is an example calendar.');
  });
});
