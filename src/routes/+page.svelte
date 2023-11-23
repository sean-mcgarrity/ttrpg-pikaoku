<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import CampaignLogin from './CampaignLogin.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { PlusCircle, LogInIcon } from 'lucide-svelte';
  import { getCampaigns } from '$lib/persistance/campaign';

  export let data;

  let {campaigns} = data

  $: console.log('data campaigns', data.campaigns)

</script>

<div class="text-white w-full min-h-scree">
  <div class="max-w-4xl mx-auto py-12 px-4">
    <div class="w-full mb-4">
      <h1 class="text-4xl">Sean's Game</h1>
      <div class="border-b-2 border-white border-solid w-16 mt-2" />
    </div>
    <div class="flex flex-col gap-4">
        {#each campaigns as campaign}
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
