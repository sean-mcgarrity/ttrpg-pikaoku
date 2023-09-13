<script lang="ts">
  import RefinementCard from './RefinementCard.svelte';
  import { getRelativeTime } from '$lib/utils/time';
  import { whereKeyEq } from '$lib/utils/iterators';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import ItemQuickActions from './ItemQuickActions.svelte';
  import { getCurrentItem } from '$lib/persistance/monster-parts';

  // ref: https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2020/07/destiny-2-reverie-dawn-hauberk-armor-stats.jpg

  $: query = getCurrentItem();
  $: reversedChanges = $query?.data?.changes.reverse() ?? [];
</script>

<div class="flex flex-col md:flex-row w-full gap-8">
  {#if $query.isFetching || $query.isLoading}
    <LoadingInsert />
  {/if}
  {#if $query.data}
    <div class="flex-1 flex flex-col gap-4">
      {#if !$query.isLoading && !!$query.data}
        <RefinementCard refinement={$query.data} />
        <div>
          <div class="m-auto text-white">Recent Changes</div>
          <div class="flex flex-col gap-1">
            {#each reversedChanges as change}
              <div class="flex flex-row gap-4 hover:bg-white/5 px-2 py-1 rounded">
                <div class="text-white/80 w-12">+{change.amount}</div>
                <div class="text-white/80 flex-1">
                  {#if change.imbuement_id}
                    {$query.data.imbuements.find(whereKeyEq('id', change.imbuement_id)).name}
                  {:else}
                    Refined
                  {/if}
                </div>
                <div class="text-white/80">{getRelativeTime(change.created_at)}</div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    <div class="flex-1 flex flex-col justify-start gap-4">
      <ItemQuickActions item={$query.data} />
    </div>
  {/if}
</div>
