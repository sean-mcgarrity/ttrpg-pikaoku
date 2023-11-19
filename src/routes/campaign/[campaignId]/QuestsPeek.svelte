<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import QuestItem from '$components/quests/QuestItem.svelte';
  import { getPinnedQuestsQuery } from '$lib/persistance/quests';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { ArrowRight, Plus } from 'lucide-svelte';

  $: console.log('hello');

  const questQuery = getPinnedQuestsQuery();
</script>

<div class="">
  <div class="w-full justify-between flex flex-row">
    <Heading type="Section Heading">Pinned Quests</Heading>
    <LinkButton href={`/campaign/${getCampaignId()}/quests`} class="text-sm"
      >See All <ArrowRight /></LinkButton
    >
  </div>
  {#if $questQuery.error}
    <p class="text-red-500">Error: {$questQuery.error}</p>
  {:else if $questQuery.isLoading}
    <p class="text-yellow-500">Loading...</p>
  {:else if $questQuery.data}
    <div class="flex flex-col gap-2">
      {#each $questQuery.data as quest (quest.id)}
        <QuestItem {quest} preview />
      {:else}
        <div class="italic text-sm text-white/80">No quests have been pinned</div>
      {/each}
    </div>
  {/if}
</div>
