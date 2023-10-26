<script lang="ts">
  import { page } from '$app/stores';

  import LinkButton from '$components/LinkButton.svelte';
  import { getUsableSourcesPreview } from '$lib/persistance/monster-parts';
  import Heading from '$components/layout/Heading.svelte';
  import { ArrowRight } from 'lucide-svelte';
  import MonsterCard from './monsters/MonsterCard.svelte';
  $: campaignId = $page.params.campaignId;

  const sourcesQuery = getUsableSourcesPreview();
  $: monsters = $sourcesQuery.data ?? [];
  $: console.log('monsters', monsters);
</script>

<div class="w-full">
  <Heading type="Section Heading">Usable Monsters</Heading>
  <p class="mb-4">
    The best of your unused monster parts. Slap them on a skill item so they don't go to waste.
  </p>
  {#if monsters.length}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#if monsters.length === 0}
        <div class="text-white text-center">No monsters found.</div>
      {/if}
      {#each monsters as monster}
        <MonsterCard {monster} />
      {/each}
    </div>
  {/if}
  <div class="text-center py-4">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters`}
      >See All <ArrowRight /></LinkButton
    >
  </div>
</div>
