<script lang="ts">
  import BackTo from '$components/buttons/BackTo.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let campaignId = $derived(getCampaignId());
</script>

<BackTo href={`/campaigns/${campaignId}/bastions`} text="all bastions" />
{@render children?.()}
