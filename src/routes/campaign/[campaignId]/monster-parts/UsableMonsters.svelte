<script lang="ts">
  import { page } from '$app/stores';

  import LinkButton from '$components/LinkButton.svelte';
  import { getUsableSources } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import { Edit, Plus } from 'lucide-svelte';
  import { getMonsterPartsForLevel } from '$lib/systems/pf2e_monster_parts';
  import { slide } from 'svelte/transition';
  $: campaignId = $page.params.campaignId;

  let expandedMonster = null;

  const sourcesQuery = getUsableSources();
  $: monsters = $sourcesQuery.data ?? [];
  $: console.log('monsters', monsters);
</script>

<div class="flex flex-col w-full">
  <Heading type="Section Heading">Usable Monsters</Heading>
  {#if monsters.length}
    <div class="flex flex-col gap-2">
      {#if monsters.length === 0}
        <div class="text-white text-center">No monsters found.</div>
      {/if}
      {#each monsters as monster}
        <div class="w-full">
          <button
            class="w-full flex flex-row cursor-pointer border-b-4 border-yellow-600/70 hover:bg-white/20"
            on:click={() => (expandedMonster = expandedMonster === monster ? null : monster)}
          >
            <div
              class="bg-yellow-600/70 px-2 py-2 w-28 whitespace-nowrap text-right h-full border-t-2 border-transparent"
            >
              {monster.quantity * getMonsterPartsForLevel(monster.level)} MP
            </div>
            <div class="text-left border-t-2 border-r-8 border-yellow-600/70 px-2 py-2 w-full">
              {monster.name}
            </div>
          </button>
          {#if monster.id === expandedMonster?.id}
            <div
              transition:slide|local
              class=" border-b-2 border-r-8 border-l-8 border-t-0 border-transparent p-4 bg-yellow-600/70"
            >
              <div>Enables:</div>
              <div>{monster.enables.join(', ')}</div>
            </div>
            <div
              transition:slide|local
              class=" border-r-8 border-l-8 border-transparent bg-yellow-600/70 p-1 text-right"
            >
              <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters/${monster.id}`}>
                Edit <Edit />
              </LinkButton>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  <div class="ml-auto mt-2">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters/add`}>Add <Plus /></LinkButton
    >
  </div>
</div>
