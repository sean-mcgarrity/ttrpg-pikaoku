<script lang="ts">
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { Plus } from 'lucide-svelte';
  import QuestItem from '$components/quests/QuestItem.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import { getQuestsQuery, createQuestMutation } from '$lib/persistance/quests';

  let questsQuery = getQuestsQuery();
  let addQuest = createQuestMutation();

  $: quests = $questsQuery.data ?? [];

  $: activeQuests = quests.filter((q) => !q.finished);
  $: finishedQuests = quests.filter((q) => q.finished);

  let newQuestName = '';
</script>

<BackToCampaign />
<div class="flex flex-col gap-4">
  <Heading type="Page Heading">Quests</Heading>
  <div class="flex flex-col gap-2">
    {#each activeQuests as quest (quest.id)}
      <QuestItem bind:quest />
    {:else}
      <div class="text-white">No quests yet</div>
    {/each}
  </div>
  <form
    class="w-2/3 mx-auto mb-4 flex flex-row bg-slate-900 items-center p-2 gap-2 shadow rounded"
    on:submit={() => {
      $addQuest.mutate({ name: newQuestName });
      newQuestName = '';
    }}
  >
    <TextField placeholder="New quest name" bind:value={newQuestName} />
    <Button disabled={!newQuestName || !$addQuest.isIdle} type="submit">
      Create <Plus class="" />
    </Button>
  </form>
  <div>
    <Heading type="Subsection Heading">Finished Quests</Heading>
    <div class="flex flex-col gap-2">
      {#each finishedQuests as quest (quest.id)}
        <QuestItem bind:quest />
      {:else}
        <div class="text-white">No quests have been finished yet</div>
      {/each}
    </div>
  </div>
</div>
