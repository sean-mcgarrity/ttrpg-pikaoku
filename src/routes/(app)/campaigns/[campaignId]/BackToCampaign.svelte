<script lang="ts">
  import { page } from '$app/stores';
  import BackTo from '$components/buttons/BackTo.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  let campaignId = $derived(getCampaignId());
  let campaignName = $derived($page.data.campaign.name);
</script>

<BackTo href={`/campaigns/${campaignId}`} text={campaignName} />
