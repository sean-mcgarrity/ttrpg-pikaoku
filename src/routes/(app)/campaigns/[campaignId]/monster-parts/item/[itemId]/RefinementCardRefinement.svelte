<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
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
  import cs from 'classnames';

  export let refinement: MP_Refinement;

  $: itemLevel = calculateRefinementLevel(refinement);
  $: progress = calculateRefinementProgress(refinement);
  $: currentLevelCost = getUpgradeCostForLevel(itemLevel, refinement.type);
  $: upgradeCost = getUpgradeCostForLevel(Math.min(itemLevel + 1, 20), refinement.type);
  $: progressPercentage = Math.round(
    ((progress - currentLevelCost) / (upgradeCost - currentLevelCost)) * 100
  );

  let seeAllLevels = false;

  $: typeBenefits = REFINEMENT_BENEFITS[refinement.type].filter((b) => b.benefits.length > 0);
  $: currentBenefits = typeBenefits.reduce(reduceToHighestLevelLte(itemLevel), null);
  $: futureLevels = typeBenefits.filter(filterByLevelGt(itemLevel));

  $: itemType = refinement.type;
</script>

<div class="px-4 py-2 flex flex-col gap-2 overflow-hidden">
  {#if currentBenefits}
    <ul class="px-4 list-disc" transition:slide|local>
      {#each currentBenefits.benefits as benefit}
        <li>{benefit}</li>
      {/each}
    </ul>
  {:else}
    <div class="text-white/80">No benefits</div>
  {/if}
  <div class="mx-auto px-12 w-full">
    <ProgressBar
      progress={progressPercentage}
      min={itemLevel}
      max={itemLevel + 1}
      progressClass={cs({
        'bg-refinement-armor': itemType === 'armor',
        'bg-refinement-weapon': itemType === 'weapon',
        'bg-refinement-skill': itemType === 'skill',
        'bg-refinement-perception': itemType === 'perception',
        'bg-refinement-shield': itemType === 'shield'
      })}
    />
  </div>
  <div class="w-full text-center font-bold text-lg">{progress} / {upgradeCost}</div>
  <div class="text-white/40 inline-flex -ml-2 flex-row select-none mr-auto">
    <Button on:click={() => (seeAllLevels = !seeAllLevels)} class="text-opacity-50">
      <div>See All</div>
      <ArrowDownIcon class={seeAllLevels && 'rotate-180'} />
    </Button>
  </div>
  {#if seeAllLevels}
    <div class="px-8" transition:slide|local>
      {#each futureLevels as level}
        <div class="font-medium text-white/60">Level {level.level}:</div>
        <ul class="px-8 list-disc">
          {#each level.benefits as benefit}
            <li class="ml-4">{benefit}</li>
          {/each}
        </ul>
      {/each}
    </div>
  {/if}
</div>
