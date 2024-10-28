<script lang="ts">
  import BackTo from '$components/buttons/BackTo.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  let campaignId = $derived(getCampaignId());
</script>

<BackTo href={`/campaigns/${campaignId}/monster-parts`} text="monster parts" />
