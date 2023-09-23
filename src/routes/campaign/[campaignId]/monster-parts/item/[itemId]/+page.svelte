<script lang="ts">
  import RefinementCard from './RefinementCard.svelte';
  import { getRelativeTime } from '$lib/utils/time';
  import { whereKeyEq } from '$lib/utils/iterators';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import ItemQuickActions from './ItemQuickActions.svelte';
  import { getCurrentItem } from '$lib/persistance/monster-parts';
  import Button from '$components/Button.svelte';
  import { Navigation2, PencilRuler } from 'lucide-svelte';
  import AddImbuement from './AddImbuement.svelte';
  import { getUnusedImbuementSlots } from '$lib/systems/pf2e_monster_parts';
  import EditItemForm from './EditItemForm.svelte';
  // ref: https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2020/07/destiny-2-reverie-dawn-hauberk-armor-stats.jpg
  $: query = getCurrentItem();
  $: reversedChanges = $query?.data?.changes.reverse() ?? [];
  $: canAddImbuement = $query.isFetched && getUnusedImbuementSlots($query.data) > 0;
  let tab: 'quick-actions' | 'add-imbuement' | 'edit' = 'quick-actions';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
  {#if $query.isFetching || $query.isLoading}
    <LoadingInsert fullPage={true} />
  {/if}
  {#if $query.data}
    <div class="flex-1 flex flex-col gap-4 w-full">
      {#if !$query.isLoading && !!$query.data}
        <RefinementCard refinement={$query.data}>
          <svelte:fragment slot="buttons">
            <Button class="sm:mr-auto" on:click={() => (tab = 'edit')}>Edit <PencilRuler /></Button>
            {#if canAddImbuement}
              <Button on:click={() => (tab = 'add-imbuement')}>Add Imbuement <Navigation2 /></Button
              >
            {/if}
          </svelte:fragment>
        </RefinementCard>
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
      {#if tab === 'quick-actions'}
        <ItemQuickActions item={$query.data} />
      {:else if tab === 'add-imbuement'}
        <AddImbuement item={$query.data} />
      {:else if tab === 'edit'}
        <EditItemForm
          refinement={$query.data}
          onCancel={() => (tab = 'quick-actions')}
          afterSave={() => (tab = 'quick-actions')}
        />
      {/if}
    </div>
  {/if}
</div>
