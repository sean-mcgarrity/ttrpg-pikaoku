<script lang="ts">
  import Button from '$components/Button.svelte';
  import ProgressBar from '$components/monster-parts/ProgressBar.svelte';
  import {
    calculateRefinementLevel,
    calculateRefinementProgress,
    getUpgradeCostForLevel,
    type MP_Refinement,
    REFINEMENT_BENEFITS
  } from '$lib/systems/pf2e_monster_parts';
  import { filterByLevelGt, reduceToHighestLevelLte } from '$lib/utils/iterators';
  import { ArrowDownIcon } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let refinement: MP_Refinement;

  $: itemLevel = calculateRefinementLevel(refinement);
  $: progress = calculateRefinementProgress(refinement);

  $: upgradeCost = getUpgradeCostForLevel(Math.min(itemLevel + 1, 20), refinement.type);

  let seeAllLevels = false;

  $: typeBenefits = REFINEMENT_BENEFITS[refinement.type].filter((b) => b.benefits.length > 0);
  $: currentBenefits = typeBenefits.reduce(reduceToHighestLevelLte(itemLevel));
  $: futureLevels = typeBenefits.filter(filterByLevelGt(itemLevel));
</script>

<div class="px-4 py-2">
  <div class="flex flex-row gap-4 mt-2 mb-4">
    <ul class="px-8 list-disc">
      {#each currentBenefits.benefits as benefit}
        <li>{benefit}</li>
      {/each}
    </ul>
  </div>
  <div class="mx-auto px-12 w-full">
    <ProgressBar progress={50} min={itemLevel} max={itemLevel + 1} barColor="#3080f0" />
  </div>
  <div class="w-full text-center font-bold text-lg">{progress} / {upgradeCost}</div>
  {#if seeAllLevels}
    <div class="px-8" transition:slide>
      {#each futureLevels as level}
        <div class="font-medium text-white/60">level {level.level}:</div>
        <ul class="px-8 list-disc">
          {#each level.benefits as benefit}
            <li class="ml-4">{benefit}</li>
          {/each}
        </ul>
      {/each}
    </div>
  {/if}
  <div class="text-white/40 inline-flex px-6 flex-row mx-auto select-none mr-auto">
    <Button on:click={() => (seeAllLevels = !seeAllLevels)} class="text-opacity-50">
      <div>See All</div>
      <ArrowDownIcon class={seeAllLevels && 'rotate-180'} />
    </Button>
  </div>
</div>
