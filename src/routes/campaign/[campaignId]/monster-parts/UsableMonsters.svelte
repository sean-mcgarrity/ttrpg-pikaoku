<script lang="ts">
  import { page } from '$app/stores';

  import LinkButton from '$components/LinkButton.svelte';
  import { getUsableSourcesPreview } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import { ArrowRight, ArrowRightSquare, Edit, Link, Plus } from 'lucide-svelte';
  import { getMonsterPartsForLevel } from '$lib/systems/pf2e_monster_parts';
  import { slide } from 'svelte/transition';
  import MonsterCard from './monsters/MonsterCard.svelte';
  $: campaignId = $page.params.campaignId;

  let expandedMonster = null;

  const sourcesQuery = getUsableSourcesPreview();
  $: monsters = $sourcesQuery.data ?? [];
  $: console.log('monsters', monsters);
</script>

<div class="flex flex-col">
  <Heading type="Section Heading">Usable Monsters</Heading>
  {#if monsters.length}
    <div class="flex flex-col gap-2 w-4/5 mx-auto">
      {#if monsters.length === 0}
        <div class="text-white text-center">No monsters found.</div>
      {/if}
      {#each monsters as monster}
        <MonsterCard {monster} />
      {/each}
    </div>
  {/if}
  <div class="ml-auto mt-2">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters/add`}>Add <Plus /></LinkButton
    >
    <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters`}
      >See All <ArrowRight /></LinkButton
    >
  </div>
</div>
