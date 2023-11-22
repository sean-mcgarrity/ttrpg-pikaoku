<script lang="ts">
  import { page } from '$app/stores';
  import { hasFeatureFlag } from '$lib/utils/feature-flags';

  type FeatureFlags = 'monster-parts' | 'bastions' | 'handouts';
  export let flag: FeatureFlags;

  $: campaign = $page.data.campaign;
  $: enabled = hasFeatureFlag(campaign, flag);
</script>

{#if enabled}
  <slot />
{/if}
