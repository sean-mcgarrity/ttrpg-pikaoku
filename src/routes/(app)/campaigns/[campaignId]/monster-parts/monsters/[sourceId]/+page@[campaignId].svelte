<script lang="ts">
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getUsableSourceById, revealSource } from '$lib/persistance/monster-parts';
  import { page } from '$app/stores';
  import LinkButton from '$components/LinkButton.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import MonsterInfoCard from './MonsterInfoCard.svelte';
  import { PencilRuler, StepBack } from 'lucide-svelte';
  import AdminOnly from '$components/AdminOnly.svelte';
  import { goto } from '$app/navigation';
  import Button from '$components/Button.svelte';
  import BackTo from '$components/BackTo.svelte';

  $: query = getUsableSourceById($page.params.sourceId);

  $: monster = $query.data;

  $: revealMutation = revealSource($page.params.sourceId);

  $: if ($query.isError && $query.error['code'] === 'PGRST116') {
    goto(`/campaigns/${$page.params.campaignId}/monster-parts/monsters`);
  }

  $: handleReveal = async () => {
    await $revealMutation.mutate();
    $query.refetch();
  };
</script>

<BackTo href={`/campaigns/${getCampaignId()}/monster-parts/monsters`} text="monsters" />
<div class="relative pt-4">
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    <div class="flex flex-col justify-center items-center w-full gap-4">
      {#if $query.isInitialLoading}
        <LoadingInsert />
      {:else if $query.isFetched && !!$query.data}
        <MonsterInfoCard {monster} />
        <div>
          <LinkButton href="/campaigns/{getCampaignId()}/monster-parts/monsters/{monster.id}/edit"
            >Edit <PencilRuler /></LinkButton
          >
          {#if !monster.revealed}
            <AdminOnly>
              <Button on:click={handleReveal}>Reveal</Button>
            </AdminOnly>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
