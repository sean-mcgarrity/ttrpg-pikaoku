<script lang="ts">
  import TextField from '$components/forms/controls/TextField.svelte';
  import TextArea from '$components/forms/controls/TextAreaField.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import Button from '$components/buttons/Button.svelte';
  import { createSuccessCardMutation } from '$lib/persistance/quests';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { goto } from '$app/navigation';
  import BackTo from '$components/buttons/BackTo.svelte';
  import { Save } from 'lucide-svelte';
  import SelectField from '$components/forms/controls/SelectField.svelte';

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

  let card_type = 'quest';

  let handleSubmit = async () => {
    await $addSuccessCard.mutateAsync(
      {
        title: newQuestName,
        description: newQuestDescription,
        tags: newQuestTags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        card_type: card_type,
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

<BackTo href={`/campaigns/${campaignId}/quest-board`} text="Quest Board" />
<div class="flex flex-col gap-4">
  <Heading type="Page Heading">Add new quest</Heading>
</div>

<div class="bg-white/5 p-4 rounded flex flex-col gap-2 shadow mb-2">
  <div class="flex flex-row gap-2">
    <div class="w-2/3">
      <TextField placeholder="Name" bind:value={newQuestName} />
    </div>
    <div class="w-1/3 flex flex-row gap-2">
      <SelectField
        options={[
          {
            value: 'quest',
            text: 'Quest'
          },
          {
            value: 'action',
            text: 'Action'
          },
          {
            value: 'other',
            text: 'Other'
          }
        ]}
        bind:value={card_type}
      />
      <NumberField placeholder="Level" bind:value={level} />
    </div>
  </div>
  <TextArea placeholder="Description" bind:value={newQuestDescription} />
  <TextField placeholder="Tags (Comma seperated)" bind:value={newQuestTags} />
</div>
<div class="bg-white/5 p-4 rounded flex flex-col gap-2 shadow mb-2">
  <TextField placeholder="Requirements" bind:value={requirements} />
  <TextField placeholder="Trigger" bind:value={trigger} />
  <TextField placeholder="Frequency" bind:value={frequency} />
</div>
<div class="bg-white/5 p-4 rounded flex flex-col gap-2 shadow mb-2">
  <TextField placeholder="Critical Success" bind:value={criticalSuccess} />
  <TextField placeholder="Success" bind:value={success} />
  <TextField placeholder="Failure" bind:value={failure} />
  <TextField placeholder="Critical Failure" bind:value={criticalFailure} />
</div>

<div class="flex flex-row justify-end">
  <Button class="" on:click={handleSubmit}><Save /> Create</Button>
</div>
