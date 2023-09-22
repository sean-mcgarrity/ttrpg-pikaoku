<script lang="ts">
  import Button from '$components/Button.svelte';
  import {
    getUpgradeCostForLevel,
    calculateUpgradeLevel,
    type Imbuement
  } from '$lib/systems/pf2e_monster_parts';
  import { slide } from 'svelte/transition';
  import { ArrowDownIcon } from 'lucide-svelte';
  import ProgressBar from '$components/monster-parts/ProgressBar.svelte';

  export let imbuement: Imbuement;
  export let changes: any = [];

  $: progress = changes.reduce((acc, curr) => acc + curr.amount, 0);
  $: imbuementLevel = calculateUpgradeLevel(progress, 'armor');

  $: highestLevelGained = imbuement.levels.reduce(
    (acc, curr) => {
      return curr.level <= imbuementLevel ? curr : acc;
    },
    { level: 0, benefits: '' }
  );

  $: nextLevel = imbuement.levels.find((level) => level.level > imbuementLevel);
  $: costOfNextLevel = getUpgradeCostForLevel(nextLevel.level, 'armor');
  $: percentageToNextLevel = Math.round((progress / costOfNextLevel) * 100);
  let seeAllLevels = false;
</script>

<div class="p-4 pb-2 flex flex-col gap-2">
  <div class="flex gap-1 uppercase text-xl tracking-wide font-semibold">{imbuement.name}</div>
  {#if imbuement.description}
    <div class="font-light text-white/60 italic">{imbuement.description}</div>
  {/if}
  {#if highestLevelGained}
    <ul class="px-4 list-disc">
      {#each highestLevelGained.benefits as benefit}
        <li>{benefit}</li>
      {/each}
    </ul>
  {/if}
  {#if nextLevel}
    <div class="mx-auto px-12 w-full">
      <ProgressBar
        progress={percentageToNextLevel}
        min={highestLevelGained.level}
        max={nextLevel.level}
        barColor="#6666cc"
      />
    </div>
    <div class="w-full text-center font-bold text-lg">{progress} / {costOfNextLevel}</div>
  {/if}
  {#if nextLevel}
    <div class="">
      <span class="font-light text-white/50">Next:</span>
      {nextLevel.preview}
    </div>
  {/if}
  {#if seeAllLevels}
    <div class="px-8" transition:slide|local>
      {#each imbuement.levels.filter((x) => x.level > highestLevelGained.level) as level}
        <div class="font-medium text-white/60">Level {level.level}:</div>
        <ul class="px-8 list-disc">
          {#each level.benefits as benefit}
            <li class="ml-4">{benefit}</li>
          {/each}
        </ul>
      {/each}
    </div>
  {/if}
  <div class="text-white/40 inline-flex -ml-2 flex-row select-none">
    <Button on:click={() => (seeAllLevels = !seeAllLevels)} class="text-opacity-50">
      <div>See All</div>
      <ArrowDownIcon class={seeAllLevels && 'rotate-180'} />
    </Button>
  </div>
</div>
