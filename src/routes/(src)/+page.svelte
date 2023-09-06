<script lang="ts">
  import AdminOnly from '$src/components/AdminOnly.svelte';
  import CampaignLogin from './CampaignLogin.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { extractData } from '$src/lib/utils/requests';

  export let data;
  const query = createQuery({
    queryKey: ['campaigns'],
    queryFn: async () =>
      extractData(
        await data.supabase.from('campaigns').select('*').order('created_at', { ascending: false })
      )
  });

  $: console.log('data', $query.data);
  $: console.log('error', $query.error);
</script>

<div class="text-white max-w-4xl mx-auto">
  <div class="w-full mb-4">
    <h1 class="text-4xl">Campaigns</h1>
  </div>
  <div class="flex flex-col gap-4">
    {#if $query.isLoading}
      LOADING
    {:else if $query.isError}
      ERROR
    {:else if $query.data?.length === 0}
      NO CAMPAIGNS
    {:else}
      {#each $query.data ?? [] as campaign}
        <CampaignLogin {campaign} />
      {/each}
    {/if}
    <AdminOnly>
      <div class="mx-auto mt-8">
        <LinkButton href="">New campaign</LinkButton>
      </div>
    </AdminOnly>
  </div>
  <div />
</div>
