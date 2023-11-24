<script lang="ts">
  import { page } from '$app/stores';
  import BackTo from '$components/BackTo.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  $: campaignId = getCampaignId();
  $: campaignName = $page.data.campaign.name;
</script>

<BackTo href={`/campaigns/${campaignId}`} text={campaignName} />
