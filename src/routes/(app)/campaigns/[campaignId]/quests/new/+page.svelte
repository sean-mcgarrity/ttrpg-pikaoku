<script lang="ts">
  import BackTo from '$components/buttons/BackTo.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { user } from '$lib/utils/auth';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import type { TablesInsert } from '$types/database';
  import { get } from 'svelte/store';
  import QuestEditForm from '../QuestEditForm.svelte';
  import { page } from '$app/stores';
  import { createQuestMutation } from '$lib/persistance/quests';

  $: campaignId = getCampaignId();
  $: userId = $user.id;

  const mutation = createQuestMutation();

  const handleCreate = async (quest: TablesInsert<'quest'>) => {
    await $mutation.mutateAsync(quest);
  };

  let quest: TablesInsert<'quest'> = {
    name: '',
    summary: '',
    description: '',
    group: '',
    campaign_id: parseInt(get(page).params.campaignId),
    creator_id: get(user).id
  };

  $: console.log('campaign id', campaignId, 'userId', userId);
</script>

<div class="mx-auto max-w-lg mb-8">
  <BackTo href={`/campaigns/${campaignId}/quests`} text="All Quests" />
  <div class="bg-slate-600/15 p-4 rounded shadow">
    <Heading type="Page Heading">Create new quest</Heading>
    <div class="mb-3">You must include at least a name and summary.</div>
    <QuestEditForm {quest} onSubmit={handleCreate} />
  </div>
</div>
