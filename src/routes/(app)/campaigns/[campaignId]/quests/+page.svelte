<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { Plus } from 'lucide-svelte';
  import QuestItem from '$components/quests/QuestItem.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import { getQuestsQuery, createQuestMutation } from '$lib/persistance/quests';
  import { createQuery } from '@tanstack/svelte-query';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { getSupabase } from '$lib/utils/requests';
  import QuestGhostLoader from './QuestGhostLoader.svelte';

  let questsQuery = getQuestsQuery();
  let addQuest = createQuestMutation();

  let supabase = getSupabase();

  let questGroups = createQuery({
    queryKey: ['quests', 'groups'],
    queryFn: async () => {
      const response = await supabase
        .from('quest_groups')
        .select('group')
        .eq('campaign_id', getCampaignId());
      return response.data.map((d) => d.group);
    }
  });

  $: quests = $questsQuery.data ?? [];
  $: finishedQuests = quests.filter((q) => q.status === 'finished' || q.status === 'deleted');

  let newQuestName = '';

  $: loading = $questsQuery.isLoading || $addQuest.isLoading || $questGroups.isLoading;

  $: console.log(
    'loading values',
    loading,
    $questsQuery.isLoading,
    $addQuest.isLoading,
    $questGroups.isLoading
  );

  $: groupedQuests = ($questGroups.data ?? [])
    .map((group) => ({
      name: group,
      quests: ($questsQuery.data ?? []).filter(
        (q) => q.group === group && q.status !== 'finished' && q.status !== 'deleted'
      )
    }))
    .filter((g) => g.quests.length > 0);
</script>

<BackToCampaign />
<div class="flex flex-col gap-4">
  <Heading type="Page Heading">Quests</Heading>
  {#if loading}
    <div class="flex flex-col gap-2">
      {#each [1, 2, 3, 4, 5] as ghostLoader}
        <QuestGhostLoader />
      {/each}
    </div>
  {:else}
    <div class="flex flex-col gap-8 mb-4">
      {#each groupedQuests as group (group.name)}
        <div>
          {#if group.name}
            <Heading type="Subsection Heading">
              {group.name}
            </Heading>
          {/if}
          <div class="flex flex-col gap-2">
            {#each group.quests as quest (quest.id)}
              <QuestItem bind:quest />
            {/each}
          </div>
        </div>
      {:else}
        <div class="text-white">No quests yet</div>
      {/each}
    </div>
    <form
      class="w-2/3 mx-auto mb-4 flex flex-row bg-yellow-600 items-center p-2 gap-2 shadow rounded"
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
  {/if}
</div>
