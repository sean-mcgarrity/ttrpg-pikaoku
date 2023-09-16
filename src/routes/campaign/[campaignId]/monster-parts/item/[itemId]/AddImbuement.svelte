<script lang="ts">
  import { getImbuementsOfType } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';

  export let item: MP_Refinement;

  $: query = getImbuementsOfType(item.base_item.type);

  let imbuementId: number;
</script>

<div>
  <div class="text-lg text-orange-500">Add Imbuement</div>
  <div class="text-white/80 text-sm mb-2">Select an imbuement to add to this item</div>
  {#if $query.isLoading}
    <div class="text-white/80 text-sm">Loading...</div>
  {/if}
  {#if $query.error}
    <div class="text-white/80 text-sm">Error: {$query.error.message}</div>
  {/if}
  {#if $query.isFetched}
    <div class="flex flex-col gap-2">
      {#each $query.data as imbuement}
        <button
          class="flex flex-row gap-4 hover:bg-white/5 px-2 py-1 rounded-sm cursor-pointer border-4 border-white/80"
          on:click={() => (imbuementId = imbuement.id)}
        >
          {imbuement.name}
        </button>
      {/each}
    </div>
  {/if}
</div>
