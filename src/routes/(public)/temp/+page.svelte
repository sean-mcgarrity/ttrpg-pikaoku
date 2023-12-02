<script lang="ts">
  import FullCalendar from '$components/calendar/FullCalendar.svelte';
  import { CalendarBuilder, CalendarYearBuild } from '$lib/systems/calendars/calendar-builder';
  const cal = CalendarBuilder.from()
    .withDays([
      { name: 'Monday' },
      { name: 'Tuesday' },
      { name: 'Wednesday' },
      { name: 'Thursday' },
      { name: 'Friday' },
      { name: 'Saturday' },
      { name: 'Sunday' }
    ])
    .withName('Earth')
    .withDescription('The planet we live on')
    .withYear(
      CalendarYearBuild.from()
        .withRepeats(3)
        .withMonth({ name: 'January', length: 31 })
        .withMonth({ name: 'February', length: 28 })
        .withMonth({ name: 'March', length: 31 })
        .withMonth({ name: 'April', length: 30 })
        .withMonth({ name: 'May', length: 31 })
        .withMonth({ name: 'June', length: 30 })
        .withMonth({ name: 'July', length: 31 })
        .withMonth({ name: 'August', length: 31 })
        .withMonth({ name: 'September', length: 30 })
        .withMonth({ name: 'October', length: 31 })
        .withMonth({ name: 'November', length: 30 })
        .withMonth({ name: 'December', length: 31 })
        .build()
    )
    .withYear(
      CalendarYearBuild.from()
        .withRepeats(1)
        .withMonth({ name: 'January', length: 31 })
        .withMonth({ name: 'February', length: 29 })
        .withMonth({ name: 'March', length: 31 })
        .withMonth({ name: 'April', length: 30 })
        .withMonth({ name: 'May', length: 31 })
        .withMonth({ name: 'June', length: 30 })
        .withMonth({ name: 'July', length: 31 })
        .withMonth({ name: 'August', length: 31 })
        .withMonth({ name: 'September', length: 30 })
        .withMonth({ name: 'October', length: 31 })
        .withMonth({ name: 'November', length: 30 })
        .withMonth({ name: 'December', length: 31 })
        .build()
    )
    .build();
</script>

<div class="bg-zinc-800 h-screen p-8 text-white">
  FULL CALENDAR
  <FullCalendar calendar={cal} />
</div>
