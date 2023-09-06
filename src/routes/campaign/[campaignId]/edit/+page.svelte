<script lang="ts">
  import EditCampaign from '$src/components/forms/EditCampaign.svelte';
  import EditCampaignCharacters from '$src/components/forms/EditCampaignCharacters.svelte';
  import BackButton from '$src/components/layout/BackButton.svelte';
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-white mb-4 flex flex-row gap-4">
    <BackButton />
    <span class="text-4xl">Edit campaign</span>
  </h1>
  <div class="flex flex-col gap-8">
    <EditCampaign />
    <EditCampaignCharacters />
  </div>
</div>
