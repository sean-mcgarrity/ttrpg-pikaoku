<script lang="ts">
  import TextField from '$components/forms/controls/TextField.svelte';
  import TextArea from '$components/forms/controls/TextAreaField.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import BackToCampaign from '../../BackToCampaign.svelte';
  import Button from '$components/buttons/Button.svelte';
  import { createSuccessCardMutation } from '$lib/persistance/quests';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { goto } from '$app/navigation';

  let campaignId = getCampaignId();

  let addSuccessCard = createSuccessCardMutation();

  let newQuestName = '';
  let newQuestDescription = '';
  let newQuestTags = '';

  let level = 0;

  let requirements = '';
  let trigger = '';
  let frequency = '';

  let criticalSuccess = '';
  let success = '';
  let failure = '';
  let criticalFailure = '';

  let handleSubmit = async () => {
    await $addSuccessCard.mutateAsync(
      {
        title: newQuestName,
        description: newQuestDescription,
        tags: newQuestTags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        card_level: level,
        requirements: requirements,
        trigger: trigger,
        frequency: frequency,
        critical_success: criticalSuccess,
        success: success,
        failure: failure,
        critical_failure: criticalFailure,
        child_card_id: null,
        campaign_id: campaignId
      },
      {
        onSuccess: () => {
          goto(`/campaigns/${campaignId}/quest-board`);
        }
      }
    );
  };
</script>

<BackToCampaign />
<div class="flex flex-col gap-4">
  <Heading type="Page Heading">Add new quest</Heading>
</div>

<div class="bg-white/5 p-4 rounded flex flex-col gap-2 shadow">
  <TextField label="Name" bind:value={newQuestName} />
  <TextArea label="Description" bind:value={newQuestDescription} />
  <TextField label="Tags" bind:value={newQuestTags} />
  <NumberField label="Level" bind:value={level} />
  <TextField label="Requirements" bind:value={requirements} />
  <TextField label="Trigger" bind:value={trigger} />
  <TextField label="Frequency" bind:value={frequency} />
  <TextField label="Critical Success" bind:value={criticalSuccess} />
  <TextField label="Success" bind:value={success} />
  <TextField label="Failure" bind:value={failure} />
  <TextField label="Critical Failure" bind:value={criticalFailure} />
</div>

<Button on:click={handleSubmit}>Create</Button>
