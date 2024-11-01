<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import { getCampaigns } from '$lib/persistance/campaign';
  import CampaignLogin from '../../CampaignLogin.svelte';

  let campaigns = $derived(getCampaigns());
</script>

<Heading type="Page Heading">Your campaigns</Heading>
{#each $campaigns.data ?? [] as campaign (campaign.id)}
  <CampaignLogin {campaign} />
{:else}
  <p class="text-center">No campaigns found.</p>
{/each}
