<script lang="ts">
  import { getUnusedImbuementSlots, type MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyEq } from '$lib/utils/iterators';
  import ItemCardHeader from './ItemCardHeader.svelte';
  import RefinementCardImbuement from './RefinementCardImbuement.svelte';
  import RefinementCardRefinement from './RefinementCardRefinement.svelte';

  export let refinement: MP_Refinement;

  $: unusedImbuementSlots = getUnusedImbuementSlots(refinement);
</script>

<div class="border-2 border-black/10 shadow overflow-hidden mb-4 max-w-lg mx-auto w-full">
  <ItemCardHeader item={refinement} />
  <div class=" bg-[#6666cc]/20 text-white flex-col gap-2">
    <div class="px-4 py-2">
      <div class="flex flex-row gap-4 text-white/80 font-light tracking-wide italic">
        {refinement.description || 'No description'}
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
    {#if unusedImbuementSlots > 1}
      <div class="border border-white/20 border-solid" />
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    {#if unusedImbuementSlots > 2}
      <div class="border border-white/20 border-solid" />
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    <div class="p-2 bg-black/25 flex flex-col-reverse sm:flex-row justify-end gap-2 tracking-wide">
      <slot name="buttons" />
    </div>
  </div>
</div>
