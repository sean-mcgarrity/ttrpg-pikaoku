<script lang="ts">
  import { getQuestsQuery } from '$lib/persistance/quests';
  import QuestDetails from './QuestDetails.svelte';

  $: quests = getQuestsQuery();

  $: quest = $quests.data?.[0];
</script>

{#if $quests.data}
  <QuestDetails {quest} />
{/if}
