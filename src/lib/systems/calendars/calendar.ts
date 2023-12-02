export type CalendarDay = {
  name: string;
  description: string;
};

export type CalendarMonth = {
  name: string;
  description: string;
  length: number;
};

/** Describes one stage in a repeating cycle of a calender, e.g. three years with 265 days would be one cycle, followed by a second stage with 266 days. */
export type CalendarYear = {
  months: CalendarMonth[];
  name: string;
  // Length: sum of months.length
  repeats?: number;
};

export type CalendarDefinition = {
  name: string;
  description: string;
  days: CalendarDay[];
  startDay: number;
  years: CalendarYear[];
};

export const calculateCycleLength = (calendar: CalendarDefinition): number => {
  return calendar.cycle.reduce((acc, cycle) => acc + cycle.months.length, 0);
};

export const getCurrentCycle = (calendar: CalendarDefinition, daysSinceDayZero: number): number => {
  return Math.floor(daysSinceDayZero / calculateCycleLength(calendar));
};

export const getCurrentMonth = (calendar: CalendarDefinition, day: number): string => {
  let daysPassed = 0;
  for (const month of calendar.years[0].months) {
    daysPassed += month.length;
    if (day < daysPassed) {
      return month.name;
    }
  }
  return '';
};

export const getYearLength = (cycle: CalendarYear): number => {
  return cycle.months.reduce((acc, month) => acc + month.length, 0);
};

export const getCycleLength = (calendar: CalendarDefinition): number => {
  return calendar.years.reduce(
    (acc, cycle) => acc + getYearLength(cycle) * (cycle.repeats ?? 1),
    0
  );
};

export const getDayForOffset = (calendar: CalendarDefinition, offset: number): CalendarDay => {
  return calendar.days[(calendar.startDay + offset) % calendar.days.length];
};

export const getYearForOffset = (calendar: CalendarDefinition, offset: number): number => {
  const cycleLength = getCycleLength(calendar);
  const currentCycleNumber = Math.floor(offset / cycleLength);
  const yearsWithinCycle = calendar.years.reduce((acc, cycle) => acc + cycle.repeats ?? 1, 0);
  const daysIntoCycle = offset % cycleLength;
  let runningDaysTotal = 1;
  let year = 1; // How many years into the cycle are we
  for (const cycle of calendar.years) {
    for (let i = 0; i < cycle.repeats ?? 1; i++) {
      if (runningDaysTotal + getYearLength(cycle) > daysIntoCycle) {
        break;
      } else {
        runningDaysTotal += getYearLength(cycle);
        year++;
      }
    }
  }
  return currentCycleNumber * yearsWithinCycle + year;
};

export const getNumberOfYearsInCycle = (calendar: CalendarDefinition): number => {
  return calendar.years.reduce((acc, cycle) => acc + cycle.repeats ?? 1, 0);
};

export const getStartDayNumberForYearNumber = (
  calendar: CalendarDefinition,
  yearNumber: number
): number => {
  const cycleLength = getCycleLength(calendar);
  const cycleNumber = Math.floor(yearNumber / calendar.years.length);
  const daysFromPastCycles = cycleNumber * cycleLength;
  const yearsInCycle = calendar.years.reduce((acc, cycle) => acc + cycle.repeats ?? 1, 0);
  const yearNumberWithinCycle = yearNumber % yearsInCycle;
  let daysFromPastYears = 0;
  for (let i = 0; i < yearNumberWithinCycle; i++) {
    daysFromPastYears += getYearLength(calendar.years[i]);
  }
  return calendar.startDay + daysFromPastCycles + daysFromPastYears;
};

    export const getFirstDayNumberForMonthAndYear = (
  calendar: CalendarDefinition,
  year: number,
  month: number
): number => {
  const cycleLength = getCycleLength(calendar);
  const cycleNumber = Math.floor(year / calendar.years.length);
  const daysFromPastCycles = cycleNumber * cycleLength;
  const yearsInCycle = calendar.years.reduce((acc, cycle) => acc + cycle.repeats ?? 1, 0);
  const yearNumberWithinCycle = year % yearsInCycle;
  let daysFromPastYears = 0;
  console.log('years', calendar.years);
  for (let i = 0; i < yearNumberWithinCycle; i++) {
    console.log('year num i', yearNumberWithinCycle, i);
    daysFromPastYears += getYearLength(calendar.years[i]);
  }
  let daysFromPastMonths = 0;

  for (let i = 0; i < month; i++) {
    console.log('month', month);
    console.log('them months', i, calendar.years[yearNumberWithinCycle].months);
    daysFromPastMonths += calendar.years[yearNumberWithinCycle].months[i].length;
  }
  return calendar.startDay + daysFromPastCycles + daysFromPastYears + daysFromPastMonths;
};

export const getDayForDayNumber = (
  calendar: CalendarDefinition,
  dayNumber: number
): CalendarDay => {
  const dayOffset = dayNumber % calendar.days.length;
  return calendar.days[dayOffset];
};
