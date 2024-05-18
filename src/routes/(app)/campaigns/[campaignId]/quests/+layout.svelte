<script lang="ts">
  import { page } from '$app/stores';
  import { getQuestsQuery } from '$lib/persistance/quests';
  import QuestCard from './QuestCard.svelte';

  $: campaignId = $page.params.campaignId;
  const quests = getQuestsQuery();
</script>

<div class="grid grid-cols-3 my-2 gap-3">
  <div class=" flex flex-col gap-3">
    {#if $quests.data}
      {#each $quests.data as quest (quest.id)}
        <a href="/campaigns/{campaignId}/quests/{quest.id}">
          <QuestCard {quest} />
        </a>
      {/each}
    {/if}
  </div>
  <div class="col-span-2">
    {#if $quests.data?.length === 0}
      <div class="text-white">No quests yet</div>
    {:else}
      <slot />
    {/if}
  </div>
</div>
