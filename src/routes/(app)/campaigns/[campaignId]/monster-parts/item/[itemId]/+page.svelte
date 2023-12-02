<script lang="ts">
  import RefinementCard from './RefinementCard.svelte';

  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getCurrentItem } from '$lib/persistance/monster-parts';
  import Button from '$components/buttons/Button.svelte';
  import { Navigation2, PencilRuler, X } from 'lucide-svelte';
  import AddImbuement from './AddImbuement.svelte';
  import { getUnusedImbuementSlots } from '$lib/systems/pf2e_monster_parts';
  import EditItemForm from './EditItemForm.svelte';
  import RecentItemChanges from './RecentItemChanges.svelte';
  import BigButton from '$components/buttons/BigButton.svelte';
  import RefinePane from './RefinePane.svelte';
  import ImbuePane from './ImbuePane.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';

  let query = getCurrentItem();

  $: if ($query.isError && $query.error['code'] === 'PGRST116') {
    goto(`/campaigns/${$page.params.campaignId}/monster-parts`);
  }

  $: canAddImbuement = $query.isSuccess && getUnusedImbuementSlots($query.data) > 0;
  let tab: 'edit' | 'none' | 'refine' | 'imbue' | 'add-imbuement' | 'changes' = 'none';

  $: changeTab = (newTab: typeof tab) => {
    tab = newTab;
  };
</script>

<div class="flex flex-row gap-4">
  {#if $query.isFetching || $query.isLoading}
    <LoadingInsert fullPage={true} />
  {/if}
  {#if $query.data && $query.isSuccess}
    <div class="flex flex-col gap-4 max-w-sm min-w-sm min-w-[24rem] w-full">
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
    <div class="flex flex-col w-full">
      {#if tab === 'none'}
        <div
          class="flex flex-col gap-2 justify-center items-center pt-4 w-full"
          out:fade|local={{ duration: 75 }}
          in:fade|local={{ duration: 75, delay: 75 }}
        >
          <Button class="pointer-events-none invisible mx-auto">Cancel</Button>
          <BigButton on:click={() => changeTab('refine')}>Refine</BigButton>
          {#if $query.data?.imbuements?.length > 0}
            <BigButton on:click={() => changeTab('imbue')}>Imbue</BigButton>
          {/if}
          {#if canAddImbuement}
            <BigButton on:click={() => changeTab('add-imbuement')}>Add Imbuement</BigButton>
          {/if}
          <BigButton on:click={() => changeTab('changes')}>Changes</BigButton>
          <BigButton on:click={() => changeTab('edit')}>Edit</BigButton>
        </div>
      {:else}
        <div
          class="flex flex-col w-full"
          in:fade={{
            duration: 75,
            delay: 75
          }}
        >
          <Button on:click={() => (tab = 'none')} class="mx-auto mb-4">Cancel <X /></Button>
          {#if tab === 'refine'}
            <RefinePane item={$query.data} />
          {:else if tab === 'imbue'}
            <ImbuePane item={$query.data} />
          {:else if tab === 'add-imbuement'}
            <AddImbuement item={$query.data} afterAdd={() => (tab = 'none')} />
          {:else if tab === 'edit'}
            <EditItemForm refinement={$query.data} afterSave={() => (tab = 'quick-actions')} />
          {:else if tab === 'changes'}
            <RecentItemChanges item={$query.data} />
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>
