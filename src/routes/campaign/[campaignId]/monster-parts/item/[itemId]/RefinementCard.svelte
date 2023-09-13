<script lang="ts">
  import Button from '$components/Button.svelte';
  import { calculateRefinementLevel, type MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyEq } from '$lib/utils/iterators';
  import RefinementCardImbuement from './RefinementCardImbuement.svelte';
  import RefinementCardRefinement from './RefinementCardRefinement.svelte';

  export let refinement: MP_Refinement;

  $: itemLevel = calculateRefinementLevel(refinement);
  $: sellCost = Math.floor(refinement.changes.map((c) => c.amount).reduce((a, b) => a + b, 0) / 2);
</script>

<div class="border-2 border-black/10 shadow overflow-hidden mb-4 max-w-lg mx-auto">
  <div class="bg-[#6666cc] flex flex-row text-white">
    <div class="w-full px-4 py-2">
      <h1 class="text-3xl font-bold tracking-wide uppercase">
        {refinement.name}
      </h1>
      <div class="flex flex-row">
        <div class="font-medium capitalize tracking-wider text-white/80 text-lg">
          {refinement.type}
        </div>
        <span class="text-white/60 ml-auto">Sell {sellCost}GP</span>
      </div>
    </div>
    <div class="text-6xl font-extrabold px-4 py-2 bg-black/10 flex">
      <div class="m-auto">{itemLevel}</div>
    </div>
  </div>
  <div class=" bg-[#6666cc]/20 text-white flex-col gap-2">
    <div class="px-4 py-2">
      <div class="flex flex-row gap-4 text-white/80 font-light tracking-wide italic">
        {refinement.description}
      </div>
    </div>
    <div class="border border-white/20 border-solid" />
    <RefinementCardRefinement {refinement} />
    <div class="border border-white/20 border-solid" />
    {#each refinement.imbuements as imbuement}
      <RefinementCardImbuement
        {imbuement}
        changes={refinement.changes.filter(whereKeyEq('imbuement_id', imbuement.id))}
      />
    {/each}
    {#if refinement.imbuements.length < 2}
      <div class="border border-white/20 border-solid" />
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    {#if refinement.imbuements.length < 3}
      <div class="border border-white/20 border-solid" />
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    <div class="p-2 bg-black/25 flex flex-col-reverse sm:flex-row justify-end gap-2 tracking-wide">
      <Button class="sm:mr-auto">Edit &#9881;</Button>
      <Button>Imbue &#8682;</Button>
      <Button>Refine &#9874;</Button>
    </div>
  </div>
</div>
