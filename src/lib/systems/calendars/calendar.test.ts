import * as CalendarSystem from './calendar';
import { expect, test, describe, it } from 'vitest';
import { CalendarBuilder } from './calendar-builder';
import { JulianCalendar } from './calender-definitions';

describe('Calendar', () => {
  describe.skip('Cycle math', () => {
    describe('calculateCycleLength', () => {
      test('should return the correct number of months in a cycle', () => {
        const length = CalendarSystem.calculateCycleLength(JulianCalendar);
        expect(length).toBe(12);
      });
      it('should be able to handle zero', () => {
        const noMonthsCalendar = CalendarBuilder.from().build();
        const length = CalendarSystem.calculateCycleLength(noMonthsCalendar);
        expect(length).toBe(0);
      });
    });

    describe('getCurrentCycle', () => {
      test('should return the correct cycle', () => {
        const cycle = CalendarSystem.getCurrentCycle(JulianCalendar, 0);
        expect(cycle).toBe(0);
      });
      it('should be able to handle zero', () => {
        const noMonthsCalendar = CalendarBuilder.from().build();
        const cycle = CalendarSystem.getCurrentCycle(noMonthsCalendar, 0);
        expect(cycle).toBe(0);
      });
    });
  });

  describe('get start day number for year number', () => {
    it('should be able to handle zero', () => {
      const noMonthsCalendar = CalendarBuilder.from().build();
      const day = CalendarSystem.getStartDayNumberForYearNumber(noMonthsCalendar, 1);
      expect(day).toBe(0);
    });
    it('should be able to handle a single year', () => {
      expect(CalendarSystem.getStartDayNumberForYearNumber(JulianCalendar, 1)).toBe(365);
    });
    it('should be able to handle a leap year', () => {
      expect(CalendarSystem.getStartDayNumberForYearNumber(JulianCalendar, 5)).toBe(
        365 * 3 + 366 + 1
      );
    });
  });
});
