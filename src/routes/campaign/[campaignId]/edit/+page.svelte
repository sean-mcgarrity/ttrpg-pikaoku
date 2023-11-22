<script lang="ts">
  import EditCampaign from '$components/forms/EditCampaign.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import CampaignCharcatersEditor from './AdminCampaignCharacters.svelte';
  import FeatureFlagManager from './FeatureFlagManager.svelte';
</script>

<BackToCampaign />
<div class="">
  <Heading type="Page Heading">Campaign details</Heading>
  <div class="flex flex-col gap-8">
    <EditCampaign />
    <FeatureFlagManager />
    <CampaignCharcatersEditor />
  </div>
</div>
