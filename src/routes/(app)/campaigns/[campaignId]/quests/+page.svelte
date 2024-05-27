<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/buttons/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getQuestsQuery } from '$lib/persistance/quests';
  import { PlusIcon } from 'lucide-svelte';
  import QuestCard from './QuestCard.svelte';

  const quests = getQuestsQuery();

  $: questGroups = Array.from(new Set($quests.data?.map((quest) => quest.group)))
    .filter((x) => !!x)
    .concat(['']);

  $: console.log('quests', $quests.data);
  $: console.log(questGroups);
</script>

<Heading type="Page Heading">Quests</Heading>
<Button color="green" href="quests/new" oldStyle={false} class="mb-4">
  <PlusIcon />
  New Quest</Button
>
<div class="flex flex-row flex-wrap gap-8">
  {#if $quests.data}
    {#each questGroups as group (group)}
      {@const groupQuests = $quests.data.filter((quest) => quest.group === group)}
      <div class="w-full flex flex-col gap-2">
        <Heading tight type="Section Heading">{group || 'Ungrouped'}</Heading>
        {#each groupQuests as quest (quest.id)}
          <QuestCard {quest} link />
        {/each}
      </div>
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
