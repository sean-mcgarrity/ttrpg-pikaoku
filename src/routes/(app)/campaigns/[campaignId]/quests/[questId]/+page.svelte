<script lang="ts">
  import { page } from '$app/stores';
  import { getQuestsQuery } from '$lib/persistance/quests';
  import QuestDetails from '../QuestDetails.svelte';

  $: quests = getQuestsQuery();
  $: quest = $quests.data?.find((q) => q.id === parseInt($page.params.questId));
</script>

{#if quest}
  <QuestDetails {quest} />
{:else}
  <div class="text-white">No quests yet</div>
{/if}
