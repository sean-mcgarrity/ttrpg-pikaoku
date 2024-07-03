<script lang="ts">
  import EditCampaign from '$components/forms/EditCampaign.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import CampaignInviteManager from './CampaignInviteManager.svelte';
  import FeatureFlagManager from './FeatureFlagManager.svelte';
</script>

<div class="">
  <Heading type="Page Heading">Campaign details</Heading>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-2 gap-4">
      <EditCampaign />
      <FeatureFlagManager />
    </div>
    <!-- <CampaignCharcatersEditor /> -->
    <CampaignInviteManager />
  </div>
</div>
