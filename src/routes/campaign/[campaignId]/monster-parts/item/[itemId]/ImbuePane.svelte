<script lang="ts">
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyOverlap } from '$lib/utils/iterators';
  import QuickUseSource from './QuickUseSource.svelte';
  import { getSourcesForItems, insertRefinementChange } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';

  export let item: MP_Refinement;

  $: requirements = [
    ...(item?.imbuements.map((i) => i.requires).flat() ?? []),
    ...(item?.base_item?.requires || [])
  ];
  $: queryMats = getSourcesForItems(requirements);
  $: refine = insertRefinementChange();

  $: imbuementOptions = item.imbuements
    .map((i) => {
      const options = $queryMats.data?.filter(whereKeyOverlap('enables', i.requires)) ?? [];
      return options.map((o) => ({ ...o, imbuement: i }));
    })
    .flat();

  $: console.log('options', imbuementOptions);
</script>

<div class="flex flex-col gap-2">
  {#if $queryMats.isFetched}
    {#if imbuementOptions.length > 0}
      <div class="mb-4">
        <Heading type="Subsection Heading">Imbue Item</Heading>
        <p class="text-sm">
          Click one of your collected monster parts below to consume them and increase the level of
          an imbuement that has been added to your item.
        </p>
      </div>
      {#each imbuementOptions as source (source.id)}
        <QuickUseSource
          {source}
          onClick={(amount) =>
            $refine.mutate({ sourceId: source.id, amount, imbuementId: source.imbuement.id })}
          actionText="Refine base item"
        />
      {/each}
    {/if}
  {/if}
</div>
