<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import CampaignLogin from './CampaignLogin.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { PlusCircle, LogInIcon } from 'lucide-svelte';

  export let data;

  let { campaigns } = data;
</script>

<svelte:head>
  <title>Sean's Runs Games</title>
</svelte:head>
<div class="text-white w-full min-h-screen min-w-[320px] ">
  <div class="flex flex-col relative">
    <img src="https://i.imgur.com/yNNtAgU.jpeg" alt="" class="w-full object-contain" />
    <h1
      class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap xs:text-3xl md:text-4xl p-3 pb-1 rounded bg-black/60 font-medium uppercase font-title"
    >
      Sean's Game
    </h1>
  </div>
  <div class="max-w-4xl mx-auto pb-12 px-4 pt-12">
    <div class="flex flex-col gap-4">
      {#each campaigns as campaign (campaign.id)}
        <CampaignLogin {campaign} />
      {/each}
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
