<script lang="ts">
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyOverlap } from '$lib/utils/iterators';
  import QuickUseSource from './QuickUseSource.svelte';
  import { getSourcesForItems, insertRefinementChange } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import cs from 'classnames';

  export let item: MP_Refinement;

  $: requirements = [
    ...(item?.imbuements.map((i) => i.requires).flat() ?? []),
    ...(item?.base_item?.requires || [])
  ];
  $: queryMats = getSourcesForItems(requirements);
  $: refinementActions =
    $queryMats.data?.filter(whereKeyOverlap('enables', item?.base_item.requires ?? [])) ?? [];
  $: refine = insertRefinementChange();

  $: hasImbuementActions =
    $queryMats.data?.some(
      whereKeyOverlap('enables', item?.imbuements.map((i) => i.requires).flat() ?? [])
    ) ?? false;
</script>

<div class="flex flex-col">
  {#if $queryMats.isFetched}
    {#if $queryMats.data.length === 0}
      <div class="text-white">No quick actions available for this item</div>
    {/if}
    <div class={cs('grid gap-2', hasImbuementActions ? 'grid-cols-2' : 'grid-cols-1')}>
      <div class={cs('grid gap-2', hasImbuementActions ? 'grid-cols-1' : 'grid-cols-2')}>
        {#if refinementActions.length > 0}
          <Heading type="Subsection Heading">Refine Item</Heading>
          {#each refinementActions as source (source.id)}
            <QuickUseSource
              {source}
              onClick={(amount) => $refine.mutate({ sourceId: source.id, amount })}
              actionText="Refine base item"
            />
          {/each}
        {/if}
      </div>
      <div class="flex flex-col gap-2">
        <Heading type="Subsection Heading">Improve Imbuements</Heading>
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
    </div>
  {/if}
</div>
