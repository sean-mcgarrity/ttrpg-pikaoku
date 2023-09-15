<script lang="ts">
  import { page } from '$app/stores';
  import type { MP_Refinement, MP_UsableSource } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyOverlap } from '$lib/utils/iterators';
  import { extractData } from '$lib/utils/requests';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import QuickUseSource from './QuickUseSource.svelte';
  import { getSourcesForItems, insertRefinementChange } from '$lib/persistance/monster-parts';

  export let item: MP_Refinement;

  $: requirements = [
    ...(item?.imbuements.map((i) => i.requires).flat() ?? []),
    ...(item?.base_item?.requires || [])
  ];
  $: queryMats = getSourcesForItems(requirements);
  $: refinementActions =
    $queryMats.data?.filter(whereKeyOverlap('enables', item?.base_item.requires ?? [])) ?? [];
  $: refine = insertRefinementChange();
</script>

<div class="flex flex-col">
  <div class="pl-2 mb-2 text-yellow-500 text-2xl font-semibold border-l-4 border-yellow-500">
    Quick actions
  </div>
  {#if $queryMats.isFetched}
    {#if $queryMats.data.length === 0}
      <div class="text-white">No quick actions available for this item</div>
    {/if}
    <div class="flex flex-col gap-2">
      {#each refinementActions as source (source.id)}
        <QuickUseSource
          {source}
          onClick={(amount) => $refine.mutate({ sourceId: source.id, amount })}
          actionText="Refine base item"
        />
      {/each}
      {#each item.imbuements as imbuement (imbuement.id)}
        {#each $queryMats.data?.filter(whereKeyOverlap('enables', item?.imbuements
              .map((i) => i.requires)
              .flat() ?? [])) ?? [] as source (source.id)}
          <QuickUseSource
            {source}
            onClick={(amount) =>
              $refine.mutate({ sourceId: source.id, imbuementId: imbuement.id, amount })}
            actionText={`Imbue ${imbuement.name}`}
            buttonText={`Imbue`}
          />
        {/each}
      {/each}
    </div>
  {/if}
</div>
