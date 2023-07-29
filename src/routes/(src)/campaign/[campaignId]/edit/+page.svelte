<script lang="ts">
  import { page } from '$app/stores';
  import Breadcrumbs from '$src/components/Breadcrumbs.svelte';
  import EditCampaign from '$src/components/forms/EditCampaign.svelte';
  import BackButton from '$src/components/layout/BackButton.svelte';
</script>

<div class="max-w-2xl mx-auto">
  <Breadcrumbs />
  <h1 class="text-white mb-4 flex flex-row gap-4">
    <BackButton />
    <span class="text-4xl">Edit campaign</span>
  </h1>
  <EditCampaign />
</div>
