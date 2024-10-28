<script lang="ts">
  import { run } from 'svelte/legacy';

  import Button from '$components/buttons/Button.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import {
    getYearForOffset,
    type CalendarDefinition,
    getStartDayNumberForYearNumber,
    getDayForDayNumber,
    getFirstDayNumberForMonthAndYear
  } from '$lib/systems/calendars/calendar';
  import { CalendarBuilder, CalendarYearBuild } from '$lib/systems/calendars/calendar-builder';
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  interface Props {
    calendar: CalendarDefinition;
  }

  let { calendar }: Props = $props();
  let cal = $derived(calendar);

  onMount(() => {});

  let currentYear = $state(4723);
  let currentMonth = $state(1);

  let handleBackYear = $derived(() => {
    currentYear -= 1;
  });

  let handleNextYear = $derived(() => {
    currentYear += 1;
  });

  let handleBackMonth = $derived(() => {
    currentMonth -= 1;
  });

  let handleNextMonth = $derived(() => {
    currentMonth += 1;
  });

  run(() => {
    if (calendar) {
      const firstDay = getDayForDayNumber(
        calendar,
        getFirstDayNumberForMonthAndYear(calendar, currentYear, currentMonth)
      );
      console.log('first day', firstDay);
    }
  });
</script>

<div>
  <div class="my-4 flex flex-row gap-4">
    <Button on:click={handleBackYear}><ArrowLeft /> Back Year</Button>
    <Button>{currentYear}</Button>
    <Button on:click={handleNextYear}>Next Year <ArrowRight /></Button>
  </div>
  <div class="my-4 flex flex-row gap-4">
    <Button on:click={handleBackMonth}><ArrowLeft /> Back Month</Button>
    <Button>{currentMonth}</Button>
    <Button on:click={handleNextMonth}>Next Month <ArrowRight /></Button>
  </div>
  <div>I am the {cal.name} calendar</div>
  <div
    class="grid auto-cols-auto gap-2"
    style={`grid-template-columns: repeat(${cal.days.length}, minmax(0,1fr))`}
  >
    {#each cal.days as day, i}
      <div class="grid-col h-20 bg-white/20 p-2 hover:bg-white/30 cursor-pointer">
        {day.name}
      </div>
    {/each}
    {#each cal.days as day, i}
      <div class="grid-col h-20 bg-white/20 p-2 hover:bg-white/30 cursor-pointer">
        {day.name}
      </div>
    {/each}
    {#each cal.days as day, i}
      <div class="grid-col h-20 bg-white/20 p-2 hover:bg-white/30 cursor-pointer">
        {day.name}
      </div>
    {/each}
  </div>
</div>
