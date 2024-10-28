<script lang="ts">
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getUnusableSources, getUsableSources } from '$lib/persistance/monster-parts';
  import { PlusIcon } from 'lucide-svelte';
  import MonsterCard from './MonsterCard.svelte';
  import { page } from '$app/stores';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { userIsAdmin } from '$lib/utils/auth';

  let campaignId = $derived($page.params.campaignId);

  let usableSourcesQ = getUsableSources();
  let unusableSourcesQ = getUnusableSources();

  let searchFilter = $state('');
  let searchFilterLc = $derived(searchFilter.toLowerCase());

  let filteredUsableSourcesQ = $derived(($usableSourcesQ.data ?? []).filter(
    (source) =>
      source.name.toLowerCase().includes(searchFilterLc) ||
      source.enables.some((trait) => trait.toLowerCase().includes(searchFilterLc))
  ));
</script>

<Heading type="Page Heading">Campaign Monsters</Heading>

<p class="mb-6">
  All the monsters you've slain and retrieved parts from can be found here. You can use these
  monsters to create new items or imbue your items with powerful effects.
</p>
<div class="max-w-md w-full my-4 rounded mr-auto bg-white/10 p-4">
  <TextField label="Filter" bind:value={searchFilter} class="mb-4" />
</div>

<div class="mb-8">
  <div class="flex flex-row justify-between">
    <Heading type="Section Heading">Usable Monsters</Heading>
    <LinkButton href="/campaigns/{campaignId}/monster-parts/monsters/add"
      >Add Monster
      <PlusIcon /></LinkButton
    >
  </div>
  {#if $usableSourcesQ.isSuccess}
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
      {#each filteredUsableSourcesQ as monster}
        <MonsterCard {monster} asLink />
      {/each}
    </div>
  {/if}
</div>
<Heading type="Section Heading">Depleted Monsters</Heading>
<div class="opacity-40">
  {#if $unusableSourcesQ.isSuccess}
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
      {#each $unusableSourcesQ.data as monster}
        <MonsterCard {monster} asLink={$userIsAdmin} />
      {/each}
    </div>
  {/if}
</div>
