<script lang="ts">
  import RefinementCard from './RefinementCard.svelte';

  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import ItemQuickActions from './ItemQuickActions.svelte';
  import { getCurrentItem } from '$lib/persistance/monster-parts';
  import Button from '$components/Button.svelte';
  import { Navigation2, PencilRuler } from 'lucide-svelte';
  import AddImbuement from './AddImbuement.svelte';
  import { getUnusedImbuementSlots } from '$lib/systems/pf2e_monster_parts';
  import EditItemForm from './EditItemForm.svelte';
  import RecentItemChanges from './RecentItemChanges.svelte';
  $: query = getCurrentItem();

  $: canAddImbuement = $query.isFetched && getUnusedImbuementSlots($query.data) > 0;
  let tab: 'quick-actions' | 'add-imbuement' | 'edit' = 'quick-actions';

  $: afterAddImbuement = () => {
    tab = 'quick-actions';
  };

  $: console.log('currnet item query', $query.data);
</script>

<div class="flex flex-col w-full gap-8 mb-8">
  {#if $query.isFetching || $query.isLoading}
    <LoadingInsert fullPage={true} />
  {/if}
  {#if $query.data}
    <div class="flex-1 flex flex-col gap-4 w-full max-w-md mx-auto">
      {#if !$query.isLoading && !!$query.data}
        <RefinementCard refinement={$query.data}>
          <svelte:fragment slot="buttons">
            <Button
              class="sm:mr-auto"
              on:click={() => (tab = tab === 'edit' ? 'quick-actions' : 'edit')}
              >Edit <PencilRuler /></Button
            >
            {#if canAddImbuement}
              <Button on:click={() => (tab = 'add-imbuement')}>Add Imbuement <Navigation2 /></Button
              >
            {/if}
          </svelte:fragment>
        </RefinementCard>
      {/if}
    </div>
  {/if}
  {#if $query.data}
    {#if tab === 'quick-actions'}
      <ItemQuickActions item={$query.data} />
    {:else if tab === 'add-imbuement'}
      <AddImbuement item={$query.data} afterAdd={afterAddImbuement} />
    {:else if tab === 'edit'}
      <EditItemForm
        refinement={$query.data}
        onCancel={() => (tab = 'quick-actions')}
        afterSave={() => (tab = 'quick-actions')}
      />
    {/if}
  {/if}
</div>
<RecentItemChanges item={$query.data} />
