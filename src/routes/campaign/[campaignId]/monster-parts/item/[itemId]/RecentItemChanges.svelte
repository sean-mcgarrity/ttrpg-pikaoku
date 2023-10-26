<script lang="ts">
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyEq } from '$lib/utils/iterators';
  import { getRelativeTime } from '$lib/utils/time';

  export let item: MP_Refinement;

  $: changes = (item?.changes ?? [])
    .map((change) => ({
      ...change,
      createdAtDate: new Date(change.created_at),
      imbuementName: item.imbuements.find(whereKeyEq('id', change.imbuement_id))?.name
    }))
    .filter((change) => !!change.imbuementName || !change.imbuement_id)
    .sort((a, b) => b.createdAtDate - a.createdAtDate);
</script>

{#if changes}
  <div>
    <div class="m-auto text-white">Recent Changes</div>
    <div class="flex flex-col gap-1">
      {#each changes as change}
        <div class="flex flex-row gap-4 hover:bg-white/5 px-2 py-1 rounded">
          <div class="text-white/80 w-12">+{change.amount}</div>
          <div class="text-white/80 flex-1">
            {#if change.imbuementName}
              {change.imbuementName}
            {:else if !change.imbuement_id}
              Refined
            {/if}
          </div>
          <div class="text-white/80">{getRelativeTime(change.created_at)}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}
