<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { PlusIcon } from 'lucide-svelte';
  import QuestCard from './QuestCard.svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/utils/auth';
  import { extractData } from '$lib/utils/requests';
  import { createQuery } from '@tanstack/svelte-query';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let campaignId = $derived($page.params.campaignId);

  let textSearch = $state('');

  let quests = $derived(createQuery({
    queryKey: ['quests', campaignId, textSearch],
    queryFn: async () => {
      const queryBuilder = $supabase
        .from('quest')
        .select('*, notes:quest_note (*, author:profile (*))')
        .eq('campaign_id', campaignId);
      if (textSearch) {
        queryBuilder.textSearch('name', textSearch);
      }
      return extractData(await queryBuilder.order('name'));
    },
    staleTime: 1000 * 60 * 60 * 24
  }));

  let questGroups = $derived(Array.from(new Set($quests.data?.map((quest) => quest.group)))
    .filter((x) => !!x)
    .concat(['']));
</script>

<Heading type="Page Heading">Quests</Heading>
<Button color="green" href="quests/new" oldStyle={false} class="mb-4">
  <PlusIcon />
  New Quest</Button
>

<TextField
  label="Search"
  bind:value={textSearch}
  placeholder="Search quests by name"
  type="search"
  class="mb-4"
/>

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
    {@render children?.()}
  {/if}
</div>
