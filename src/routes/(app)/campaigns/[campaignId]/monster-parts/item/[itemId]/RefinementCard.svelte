<script lang="ts">
  import { getUnusedImbuementSlots, type MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyEq } from '$lib/utils/iterators';
  import ItemCardHeader from './RefinementCardHeader.svelte';
  import RefinementCardImbuement from './RefinementCardImbuement.svelte';
  import RefinementCardRefinement from './RefinementCardRefinement.svelte';
  import cs from 'classnames';

  interface Props {
    refinement: MP_Refinement;
  }

  let { refinement }: Props = $props();

  let unusedImbuementSlots = $derived(getUnusedImbuementSlots(refinement));
  //bg-[#6666cc]/20

  let itemType = $derived(refinement.type);
</script>

<div class="border-2 border-black/10 shadow overflow-hidden mb-4 max-w-lg mx-auto w-full">
  <ItemCardHeader item={refinement} />
  <div
    class={cs(
      {
        'bg-refinement-armor': itemType === 'armor',
        'bg-refinement-weapon': itemType === 'weapon',
        'bg-refinement-skill': itemType === 'skill',
        'bg-refinement-perception': itemType === 'perception',
        'bg-refinement-shield': itemType === 'shield'
      },
      'bg-opacity-20 text-white flex-col gap-2'
    )}
  >
    <div class="px-4 py-2 w-full">
      <div class="flex flex-row gap-4 text-white/80 font-light tracking-wide italic">
        {refinement.description || 'No description'}
      </div>
    </div>
    <div class="border border-white/20 border-solid"></div>
    <RefinementCardRefinement {refinement} />
    <div class="border border-white/20 border-solid"></div>
    {#each refinement.imbuements as imbuement}
      <RefinementCardImbuement
        {refinement}
        {imbuement}
        changes={refinement.changes.filter(whereKeyEq('imbuement_id', imbuement.id))}
      />
    {/each}
    {#if unusedImbuementSlots > 1}
      <div class="border border-white/20 border-solid"></div>
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    {#if unusedImbuementSlots > 2}
      <div class="border border-white/20 border-solid"></div>
      <div class="px-4 py-8 text-center bg-black/10">Unused imbuement slot</div>
    {/if}
    <div class="bg-black/40 h-4"></div>
  </div>
</div>
