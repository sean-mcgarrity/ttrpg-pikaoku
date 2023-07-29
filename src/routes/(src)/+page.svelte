<script lang="ts">
  import AdminOnly from '$src/components/AdminOnly.svelte';
  import Button from '$src/components/Button.svelte';
  import LandingLink from '$src/components/LandingLink.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';

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
  <div class="w-full mb-4">
    <h1 class="text-4xl">Campaigns</h1>
  </div>
  <div class="flex flex-col gap-4">
    {#each campaigns as campaign}
      <LandingLink
        title={campaign.name}
        href={`campaign/${campaign.id}`}
        bgImgSrc={campaign.banner_src}
      />
    {/each}
    <AdminOnly>
      <div class="mx-auto mt-8">
        <LinkButton href="">New campaign</LinkButton>
      </div>
    </AdminOnly>
  </div>
  <div />
</div>
