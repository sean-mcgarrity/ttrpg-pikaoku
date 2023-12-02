<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import BackToCampaign from '../BackToCampaign.svelte';
  import { page } from '$app/stores';
  import { extractData } from '$lib/utils/requests';
  import Button from '$components/buttons/Button.svelte';
  import { ExternalLink, PlusCircle, Trash } from 'lucide-svelte';
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';

  export let data;
  $: ({ supabase } = data);
  $: campaignId = parseInt($page.params.campaignId);

  let handoutsQ = createQuery({
    queryKey: ['campaign', campaignId, 'handouts'],
    queryFn: async () => {
      return extractData(
        await supabase.from('campaign_handout').select('*').eq('campaign_id', campaignId)
      );
    }
  });

  $: killHandoutM = createMutation({
    mutationKey: ['handouts', 'kill'],
    mutationFn: async (id) => {
      return await supabase.from('campaign_handout').delete().eq('id', id);
    },
    onSuccess: async () => {
      await $handoutsQ.refetch();
    }
  });

  $: handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this handout?')) {
      await $killHandoutM.mutateAsync(id);
    }
  };

  $: handouts = $handoutsQ.data ?? [];
</script>

<BackToCampaign />
<Heading type="Page Heading">Handouts</Heading>
<LoadingInsert fullPage loading={$handoutsQ.isLoading || $killHandoutM.isLoading} />
<div class="mb-8 flex flex-col gap-2">
  {#each handouts as handout (handout.id)}
    <div class="flex flex-row gap-2">
      <a
        href={handout.link}
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-row gap-4 bg-white text-black font-medium rounded-xl shadow p-4 hover:scale-105 transition-all duration-150 cursor-pointer justify-between w-full"
      >
        {handout.label}
        <ExternalLink class="custom-icon" />
      </a>
      <AdminOnly>
        <Button on:click={() => handleDelete(handout.id)}>
          <Trash class="custom-icon stroke-red-500" />
        </Button>
      </AdminOnly>
    </div>
  {:else}
    <div class="text-white text-center">No handouts yet.</div>
  {/each}
</div>

<AdminOnly>
  <LinkButton href={`/campaigns/${campaignId}/handouts/new`} class="mx-auto">
    Add Handout <PlusCircle />
  </LinkButton>
</AdminOnly>
