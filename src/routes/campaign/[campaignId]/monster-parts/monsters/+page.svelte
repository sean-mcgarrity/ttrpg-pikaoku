<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getUnusableSources, getUsableSources } from '$lib/persistance/monster-parts';
  import { PlusIcon } from 'lucide-svelte';
  import MonsterCard from './MonsterCard.svelte';
  import { page } from '$app/stores';

  $: campaignId = $page.params.campaignId;

  let usableSourcesQ = getUsableSources();
  let unusableSourcesQ = getUnusableSources();
</script>

<Heading type="Page Heading">Campaign Monsters</Heading>

<p class="mb-6">
  All the monsters you've slain and retrieved parts from can be found here. You can use these
  monsters to create new items or imbue your items with powerful effects.
</p>

<div class="mb-8">
  <div class="flex flex-row justify-between">
    <Heading type="Section Heading">Usable Monsters</Heading>
    <LinkButton href="/campaign/{campaignId}/monster-parts/monsters/add"
      >Add Monster
      <PlusIcon /></LinkButton
    >
  </div>
  {#if $usableSourcesQ.isSuccess}
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
      {#each $usableSourcesQ.data as monster}
        <MonsterCard {monster} />
      {/each}
    </div>
  {/if}
</div>
<Heading type="Section Heading">Depleted Monsters</Heading>
<div class="opacity-40">
  {#if $unusableSourcesQ.isSuccess}
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
      {#each $unusableSourcesQ.data as monster}
        <MonsterCard {monster} />
      {/each}
    </div>
  {/if}
</div>
