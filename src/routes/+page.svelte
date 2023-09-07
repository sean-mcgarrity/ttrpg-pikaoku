<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import CampaignLogin from './CampaignLogin.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { extractData } from '$lib/utils/requests';
  import { PlusCircle, LogInIcon } from 'lucide-svelte';

  export let data;
  const campaigns = createQuery({
    queryKey: ['campaigns'],
    queryFn: async () =>
      extractData(
        await data.supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false })
          .filter('archived', 'eq', false)
      )
  });
</script>

<div class="text-white w-full min-h-screen bg-slate-950">
  <div class="max-w-4xl mx-auto py-12">
    <div class="w-full mb-4">
      <h1 class="text-6xl">Sean's Game</h1>
    </div>
    <div class="flex flex-col gap-4">
      {#if $campaigns.isLoading && !$campaigns.isFetched}
        Loading...
      {:else if $campaigns.isError}
        ERROR
      {:else if $campaigns.data?.length === 0}
        NO CAMPAIGNS
      {:else if $campaigns.isFetched && $campaigns.data?.length > 0}
        {#each $campaigns.data ?? [] as campaign}
          <CampaignLogin {campaign} />
        {/each}
      {:else}
        ERROR
      {/if}
      <div class="mx-auto mt-8">
        <LinkButton href="/login">Sean's Login <LogInIcon class="lucid-icon" /></LinkButton>
      </div>
      <AdminOnly>
        <div class="mx-auto">
          <LinkButton href="">New Campaign <PlusCircle class="lucid-icon" /></LinkButton>
        </div>
      </AdminOnly>
    </div>
  </div>
</div>
