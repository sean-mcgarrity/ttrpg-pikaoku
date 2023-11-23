<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import CampaignLogin from './CampaignLogin.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { PlusCircle, LogInIcon } from 'lucide-svelte';
  import { page } from '$app/stores';
  import Heading from '$components/layout/Heading.svelte';

  export let data;
  let { campaigns, session } = data;
  $: session = $page.data.session;
  $: hasSession = !!session?.access_token;
</script>

<svelte:head>
  <title>Sean's Runs Games</title>
</svelte:head>
<div class="text-white w-full min-h-screen min-w-[320px] ">
  <div class="flex flex-col relative pointer-events-none select-none">
    <img src="https://i.imgur.com/yNNtAgU.jpeg" alt="" class="w-full object-contain" />
    <h1
      class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap xs:text-3xl md:text-4xl p-3 pb-1 rounded bg-black/60 font-medium uppercase font-title"
    >
      Sean's Game
    </h1>
  </div>
  <div class="max-w-xl mx-auto pb-12 px-4 pt-8 grid grid-cols-1 gap-4">
    {#if hasSession}
      <p class="">
        Welcome back, <a href="/me">{session.user.user_metadata?.full_name}</a>
      </p>
      <!-- {:else}
      <div class="mx-auto">
        <LinkButton href="/login">Login <LogInIcon class="lucid-icon" /></LinkButton>
      </div> -->
    {/if}
    <Heading type="Page Heading">Campaigns</Heading>
    <div class="flex flex-col gap-4 -mt-4">
      {#each campaigns as campaign (campaign.id)}
        <CampaignLogin {campaign} />
      {:else}
        <p class="text-center">No campaigns found.</p>
      {/each}
    </div>
    <AdminOnly>
      <div class="mx-auto">
        <LinkButton href="">New Campaign <PlusCircle class="lucid-icon" /></LinkButton>
      </div>
    </AdminOnly>
  </div>
</div>
