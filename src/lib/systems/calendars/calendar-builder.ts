import type { CalendarYear, CalendarDay, CalendarDefinition, CalendarMonth } from './calendar';

/**
 * Builds a single year for a calendar which represents one index the cycle property of a full calendar object
 */
export class CalendarYearBuild {
  private cycle: CalendarDefinition['years'][number];

  private constructor() {
    this.cycle = {
      months: [],
      name: '',
      repeats: 1
    };
  }

  public static from(): CalendarYearBuild {
    return new CalendarYearBuild();
  }

  public withMonth(month: Partial<CalendarMonth>): CalendarYearBuild {
    this.cycle.months.push({
      name: '',
      description: '',
      length: 0,
      ...month
    });
    return this;
  }

  public withMonths(...months: Partial<CalendarMonth>[]): CalendarYearBuild {
    months.forEach((month) => this.withMonth(month));
    return this;
  }

  public withRepeats(repeats: number): CalendarYearBuild {
    this.cycle.repeats = repeats;
    return this;
  }

  public build(): CalendarYear {
    return this.cycle;
  }
}

export class CalendarBuilder {
  private calendar: CalendarDefinition;

  private constructor() {
    this.calendar = {
      name: '',
      description: '',
      days: [],
      startDay: 0,
      years: []
    };
  }

  public static from(): CalendarBuilder {
    return new CalendarBuilder();
  }

  public withName(name: string): CalendarBuilder {
    this.calendar.name = name;
    return this;
  }

  public withDescription(description: string): CalendarBuilder {
    this.calendar.description = description;
    return this;
  }

  public withDay(day: Partial<CalendarDay>): CalendarBuilder {
    this.calendar.days.push({
      name: '',
      description: '',
      ...day
    });
    return this;
  }

  public withDays(days: Partial<CalendarDay>[]): CalendarBuilder {
    (days ?? []).forEach((day) => this.withDay(day));
    return this;
  }

  public withYear(year: CalendarYear): CalendarBuilder {
    this.calendar.years.push(year);
    return this;
  }

  public build(): CalendarDefinition {
    return this.calendar;
  }
}
