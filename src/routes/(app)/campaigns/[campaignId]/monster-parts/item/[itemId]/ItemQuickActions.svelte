<script lang="ts">
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { whereKeyOverlap } from '$lib/utils/iterators';
  import QuickUseSource from './QuickUseSource.svelte';
  import { getSourcesForItems, insertRefinementChange } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import cs from 'classnames';
  import { ArrowDown, ArrowUp } from 'lucide-svelte';
  import Button from '$components/buttons/Button.svelte';

  interface Props {
    item: MP_Refinement;
  }

  let { item }: Props = $props();

  let requirements = $derived([
    ...(item?.imbuements.map((i) => i.requires).flat() ?? []),
    ...(item?.base_item?.requires || [])
  ]);
  let queryMats = $derived(getSourcesForItems(requirements));
  let refinementActions =
    $derived($queryMats.data?.filter(whereKeyOverlap('enables', item?.base_item.requires ?? [])) ?? []);
  let refine = $derived(insertRefinementChange());

  let expandRefinements = $state(false);
  let expandImbuements = $state(false);

  let hasImbuementActions =
    $derived($queryMats.data?.some(
      whereKeyOverlap('enables', item?.imbuements.map((i) => i.requires).flat() ?? [])
    ) ?? false);

  let imbuementOptions = $derived(item.imbuements
    .map((i) => {
      const options = $queryMats.data?.filter(whereKeyOverlap('enables', i.requires)) ?? [];
      return options.map((o) => ({ ...o, imbuement: i }));
    })
    .flat());

  let moreThanThreeRefinements = $derived(refinementActions.length > 3);
  let moreThanThreeImbuements = $derived(imbuementOptions.length > 3);

  let refinements =
    $derived(moreThanThreeRefinements && expandRefinements
      ? refinementActions
      : refinementActions.slice(0, 3));
  let nextThreeRefinments = $derived(refinementActions.slice(3, 6));
  let imbuements =
    $derived(moreThanThreeImbuements && expandImbuements
      ? imbuementOptions
      : imbuementOptions.slice(0, hasImbuementActions ? 3 : 0));
</script>

<div class="flex flex-col">
  {#if $queryMats.isFetched}
    {#if $queryMats.data.length === 0}
      <div class="text-white">No quick actions available for this item</div>
    {/if}
    <div class={cs('grid grid-cols-2 gap-4')}>
      {#if refinementActions.length > 0}
        <div>
          <Heading type="Subsection Heading">Refine Item</Heading>
          <p class="text-sm">
            Click one of your collected monster parts below to consume them and increase the level
            of your base item, unlocking additional properties and imbuement slots.
          </p>
        </div>
        {#if imbuements.length > 0}
          <div>
            <Heading type="Subsection Heading">Improve Imbuements</Heading>
            <p class="text-sm">
              Or, consume a monster that has special abilities to Imbue your item with new powers
              that allow you to deal more damage or gain access to spells.
            </p>
          </div>
        {:else}
          <div></div>
        {/if}
        <div class="flex flex-col gap-2">
          {#each refinements as source (source.id)}
            <QuickUseSource
              {source}
              onClick={(amount) => $refine.mutate({ sourceId: source.id, amount })}
              actionText="Refine base item"
            />
          {/each}
          {#if moreThanThreeRefinements}
            <Button class="text-center" on:click={() => (expandRefinements = !expandRefinements)}>
              {#if !expandRefinements}
                See All
                <ArrowDown />
              {:else}
                Collapse
                <ArrowUp />
              {/if}
            </Button>
          {/if}
        </div>
      {/if}
      {#if imbuements.length > 0}
        <div class="flex flex-col gap-2">
          {#each imbuements as source (source.id)}
            <QuickUseSource
              {source}
              onClick={(amount) =>
                $refine.mutate({ sourceId: source.id, imbuementId: source.imbuement.id, amount })}
              actionText={`${source.imbuement.name}`}
              buttonText={`Imbue`}
            />
          {/each}
          {#if moreThanThreeImbuements}
            <Button class="text-center" on:click={() => (expandImbuements = !expandImbuements)}>
              {#if !expandImbuements}
                See All
                <ArrowDown />
              {:else}
                Collapse
                <ArrowUp />
              {/if}
            </Button>
          {/if}
        </div>
      {:else}
        <div class="flex flex-col gap-2">
          {#each nextThreeRefinments as source (source.id)}
            <QuickUseSource
              {source}
              onClick={(amount) => $refine.mutate({ sourceId: source.id, amount })}
              actionText="Refine base item"
            />
          {/each}
        </div>{/if}
    </div>
  {/if}
</div>
