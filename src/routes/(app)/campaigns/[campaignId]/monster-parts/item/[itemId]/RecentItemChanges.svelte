<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { deleteRefinementChange } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyEq } from '$lib/utils/iterators';
  import { getRelativeTime } from '$lib/utils/time';
  import { X } from 'lucide-svelte';

  export let item: MP_Refinement;

  $: changes = (item?.changes ?? [])
    .map((change) => ({
      ...change,
      createdAtDate: new Date(change.created_at),
      imbuementName: item.imbuements.find(whereKeyEq('id', change.imbuement_id))?.name
    }))
    .filter((change) => !!change.imbuementName || !change.imbuement_id)
    .sort((a, b) => b.createdAtDate - a.createdAtDate);

  let deleteRefinementMutation = deleteRefinementChange();

  $: handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this change?')) {
      $deleteRefinementMutation.mutate(id);
    }
  };
</script>

{#if changes}
  <div class="">
    <div class="m-auto text-white underline-offset-4 mb-4 text-xl">Recent Changes</div>
    <div class="flex flex-col gap-1">
      {#each changes as change}
        <div class="p-2 rounded bg-black/80 text-white flex flex-row gap-2">
          <img src={change.source.img_src} alt="" class="aspect-square h-20 object-contain" />
          <div class="w-full flex flex-col justify-between">
            <div class="flex flex-row justify-between">
              {#if change.imbuementName}
                <div class="font-medium text-green-600 text-lg">Imbued</div>
              {:else if !change.imbuement_id}
                <div class="font-medium text-orange-400 text-lg">Refined</div>
              {/if}
              <div class="text-white/60 font-light">{getRelativeTime(change.created_at)}</div>
            </div>
            <div class="flex flex-row gap-4 justify-between">
              <div class="w-12 whitespace-nowrap text-ellipsis overflow-hidden flex-1 my-auto">
                +{change.amount}
                {#if change.imbuementName}
                  to {change.imbuementName}
                {/if}
                <div>from <span class="font-medium">{change.source?.name}</span></div>
              </div>
              <Button on:click={() => handleDelete(change.id)}>
                Undo <X />
              </Button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
