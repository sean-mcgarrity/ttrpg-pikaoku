<script lang="ts">
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { Plus } from 'lucide-svelte';
  import type { Quest } from 'src/app.d.ts';
  import cs from 'classnames';
  import { slide } from 'svelte/transition';
  import QuestItem from '$components/quests/QuestItem.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import { getQuestsQuery, createQuestMutation } from '$lib/persistance/quests';

  let adding = false;
  let value = '';

  let questsQuery = getQuestsQuery();
  let addQuest = createQuestMutation();

  $: quests = $questsQuery.data ?? [];

  let newQuestName = '';
</script>

<BackToCampaign />
<div>
  <Heading type="Page Heading">Quests</Heading>
  <div class="flex flex-col gap-2">
    {#each quests as quest (quest.id)}
      <QuestItem bind:quest />
    {:else}
      <div class="text-white">No quests yet</div>
    {/each}
  </div>
  <form
    class="flex flex-row mt-8 bg-slate-900 items-center p-2 gap-2 shadow rounded"
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
</div>
