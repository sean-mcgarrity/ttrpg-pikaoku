<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getCurrentCampaign, updateCurrentCampaign } from '$lib/persistance/campaign';
  import { Save } from 'lucide-svelte';

  const campaignQuery = getCurrentCampaign();
  $: campaign = $campaignQuery.data;
  const updateCampaign = updateCurrentCampaign();
  $: handleUpdate = () => {
    $updateCampaign.mutate({ ...campaign });
  };
</script>

<form on:submit={handleUpdate}>
  <Heading type="Subsection Heading">Meta</Heading>
  <div class="bg-white bg-opacity-10 rounded px-8 py-4 flex flex-col gap-2">
    {#if $campaignQuery.isLoading || !$campaignQuery.isFetched || $updateCampaign.isLoading}
      <LoadingInsert />
    {:else}
      <TextField label="Title" bind:value={campaign.name} />
      <TextField label="Description" bind:value={campaign.description} />
      <TextField label="Banner" bind:value={campaign.banner_src} />
      <SwitchField label="Archived" bind:value={campaign.archived} />
      <Button type="submit" class="mx-auto">Save <Save /></Button>
    {/if}
  </div>
</form>
