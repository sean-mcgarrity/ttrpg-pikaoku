<script lang="ts">
  import { getCurrentCampaign } from '$lib/persistance/campaign';
  import { hasFeatureFlag } from '$lib/utils/feature-flags';

  type FeatureFlags = 'monster-parts' | 'bastions' | 'handouts' | 'quest-board';
  interface Props {
    flag: FeatureFlags;
    children?: import('svelte').Snippet;
  }

  let { flag, children }: Props = $props();

  const campaignQuery = getCurrentCampaign();
  let campaign = $derived($campaignQuery.data);
  let enabled = $derived(hasFeatureFlag(campaign, flag));
</script>

{#if enabled}
  {@render children?.()}
{/if}
