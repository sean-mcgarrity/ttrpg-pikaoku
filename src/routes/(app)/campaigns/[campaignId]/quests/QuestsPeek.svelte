<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import { getPinnedQuestsQuery } from '$lib/persistance/quests';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { ArrowRight } from 'lucide-svelte';
  import QuestCard from './QuestCard.svelte';

  $: questQuery = getPinnedQuestsQuery();
</script>

<div class="flex flex-col gap-2">
  <div class="w-full justify-between flex flex-row">
    <Heading type="Section Heading">Pinned Quests</Heading>
  </div>
  {#if $questQuery.error}
    <p class="text-red-500">Error: {$questQuery.error}</p>
  {:else if $questQuery.isLoading}
    <p class="text-yellow-500">Loading...</p>
  {:else if $questQuery.data}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      {#each $questQuery.data as quest (quest.id)}
        <a
          class="hover:scale-105 transition-all duration-150"
          href={`/campaigns/${quest.campaign_id}/quests/${quest.id}`}
        >
          <QuestCard {quest} />
        </a>
      {:else}
        <div class="italic text-sm text-white/80">No quests have been pinned</div>
      {/each}
    </div>
    <a href={`/campaigns/${getCampaignId()}/quests`} class="ml-auto rounded p-2 hover:bg-white/10">
      See all quests <ArrowRight />
    </a>
  {/if}
</div>
