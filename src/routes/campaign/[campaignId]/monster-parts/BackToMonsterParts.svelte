<script lang="ts">
  import BackTo from '$components/BackTo.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  $: campaignId = getCampaignId();
</script>

<BackTo href={`/campaign/${campaignId}/monster-parts`} text="monster parts" />
