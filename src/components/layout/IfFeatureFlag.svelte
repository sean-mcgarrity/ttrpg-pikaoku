<script lang="ts">
  import { getCurrentCampaign } from '$lib/persistance/campaign';
  import { hasFeatureFlag } from '$lib/utils/feature-flags';

  type FeatureFlags = 'monster-parts' | 'bastions' | 'handouts' | 'quest-board';
  export let flag: FeatureFlags;

  const campaignQuery = getCurrentCampaign();
  $: campaign = $campaignQuery.data;
  $: enabled = hasFeatureFlag(campaign, flag);
</script>

{#if enabled}
  <slot />
{/if}
