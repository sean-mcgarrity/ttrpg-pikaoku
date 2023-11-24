<script lang="ts">
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getImbuementsOfType, insertRefinementImbuement } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';

  export let item: MP_Refinement;
  export let afterAdd: () => void = () => {};

  $: query = getImbuementsOfType(item.base_item.type);

  let addImbueMutation = insertRefinementImbuement();

  $: handleClick = (imbuementId: number) => {
    $addImbueMutation.mutate(
      {
        imbuementId,
        refinementId: item.id
      },
      {
        onSuccess: () => {
          afterAdd();
        }
      }
    );
  };
</script>

<div>
  {#if $addImbueMutation.isLoading}
    <LoadingInsert />
  {/if}
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
          class="flex flex-col p-2 rounded bg-white text-black transform transition duration-300 hover:scale-105 select-none text-left"
          on:click={() => handleClick(imbuement.id)}
        >
          <div class="font-medium">
            {imbuement.name}
          </div>
          <div class="text-sm">
            {imbuement.description}
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>
