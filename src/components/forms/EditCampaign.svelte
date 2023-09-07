<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  const campaignId = $page.params.campaignId;

  let title = '';
  let description = '';
  let bannerSrc = '';
  let passcode = '';
  let archived = false;

  let campaign = null;
  async function loadCampaigns() {
    const { data: result, error } = await $page.data.supabase
      .from('campaigns')
      .select()
      .eq('id', campaignId)
      .single();
    if (!error && result) {
      campaign = result;
      title = campaign.name;
      description = campaign.description;
      bannerSrc = campaign.banner_src;
      passcode = campaign.passcode;
      archived = campaign.archived;
    }
  }

  async function updateCampaign() {
    const { data: result, error } = await $page.data.supabase
      .from('campaigns')
      .update({
        name: title,
        description,
        banner_src: bannerSrc,
        passcode,
        archived
      })
      .eq('id', campaignId);
    if (!error && result) {
      campaign = result;
      title = campaign.name;
      description = campaign.description;
      bannerSrc = campaign.banner_src;
      passcode = campaign.passcode;
      archived = campaign.archived;
    }
  }

  $: if ($page.data.session) {
    loadCampaigns();
  }
</script>

<form on:submit={updateCampaign}>
  <div class="bg-white bg-opacity-10 rounded px-16 py-8 flex flex-col gap-4">
    <TextField label="Title" bind:value={title} />
    <TextField label="Description" bind:value={description} />
    <TextField label="Banner" bind:value={bannerSrc} />
    <TextField label="Passcode" bind:value={passcode} />
    <SwitchField label="Archived" bind:value={archived} />
    <Button type="submit" class="mx-auto">Save &#128190;</Button>
  </div>
</form>
