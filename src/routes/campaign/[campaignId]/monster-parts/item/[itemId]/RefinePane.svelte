<script lang="ts">
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyOverlap } from '$lib/utils/iterators';
  import QuickUseSource from './QuickUseSource.svelte';
  import { getSourcesForItems, insertRefinementChange } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import { FileWarning } from 'lucide-svelte';

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

<div class="flex flex-col gap-2">
  {#if $queryMats.isFetched}
    {#if refinementActions.length > 0}
      <div class="mb-2">
        <Heading type="Subsection Heading">Refine Item</Heading>
        <p class="text-sm">
          Click one of your collected monster parts below to consume them and increase the level of
          your base item, unlocking additional properties and imbuement slots.
        </p>
      </div>
      {#each refinementActions as source (source.id)}
        <QuickUseSource
          {source}
          onClick={(amount) => $refine.mutate({ sourceId: source.id, amount })}
          actionText="Refine base item"
        />
      {/each}
    {:else}
      <div class="mb-4">
        <Heading type="Subsection Heading">Refine Item</Heading>
        <FileWarning class="custom-icon w-20 h-20 text-white/80 mx-auto mb-4 mt-8" />
        <p class="text-sm text-center max-w-xs mx-auto">
          You don't have any monster parts that can be used to refine this item.
        </p>
      </div>
    {/if}
  {/if}
</div>
