<script lang="ts">
  import Button from '$src/components/Button.svelte';

  export let data;
  let campaigns = [];
  async function loadCampaigns() {
    const { data: result } = await data.supabase.from('campaigns').select('*');
    campaigns = result;
  }

  $: if (data.session) {
    loadCampaigns();
  }
</script>

<div class="text-white">
  <div class="w-full flex flex-row justify-between">
    <h1 class="text-4xl">Campaigns</h1>
    <Button>Add +</Button>
  </div>
  <div class="">
    {#each campaigns as campaign}
      <div>{campaign.name}</div>
    {/each}
  </div>
  <div />
</div>
