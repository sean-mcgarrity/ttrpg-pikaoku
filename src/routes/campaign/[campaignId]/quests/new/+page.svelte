<script lang="ts">
  import BackTo from '$components/BackTo.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  $: campaignId = getCampaignId();
</script>

<BackTo href={`/campaign/${campaignId}/quests`} text="All Quests" />
<div>
  <Heading type="Page Heading">New Quest</Heading>
</div>
