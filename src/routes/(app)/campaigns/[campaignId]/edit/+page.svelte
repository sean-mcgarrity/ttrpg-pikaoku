<script lang="ts">
  import { page } from '$app/stores';
  import EditCampaign from '$components/forms/EditCampaign.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import CampaignCharcatersEditor from './AdminCampaignCharacters.svelte';
  import CampaignInviteManager from './CampaignInviteManager.svelte';
  import FeatureFlagManager from './FeatureFlagManager.svelte';
</script>

<BackToCampaign />
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
