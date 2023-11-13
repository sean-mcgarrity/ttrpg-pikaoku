<script lang="ts">
  import EditCampaign from '$components/forms/EditCampaign.svelte';
  import BackButton from '$components/layout/BackButton.svelte';
  import CampaignCharcatersEditor from './AdminCampaignCharacters.svelte';
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-white mb-4 flex flex-row gap-4">
    <BackButton />
    <span class="text-4xl">Edit campaign</span>
  </h1>
  <div class="flex flex-col gap-8">
    <EditCampaign />
    <CampaignCharcatersEditor />
  </div>
</div>
