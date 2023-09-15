<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import ContentBlock from '$components/layout/ContentBlock.svelte';
  import PartysItemsTable from './PartysItemsTable.svelte';
  import { getUsableSources } from '$lib/persistance/monster-parts';

  $: campaignId = $page.params.campaignId;

  const sourcesQuery = getUsableSources();

  $: monsters = $sourcesQuery.data ?? [];
</script>

<div class="text-white flex flex-col md:flex-row gap-4">
  <div class="w-full">
    <h1 class="font-bold mb-4">Monster Parts</h1>
    <ContentBlock title="Unused Monsters" colorClass="bg-red-500/40" paddingClass="px-2 py-4">
      {#if monsters.length}
        {#each monsters as monster}
          <a href={`./monster-parts/monsters/${monster.id}`}>
            <div class="bg-white/20 flex rounded overflow-hidden items-center cursor-pointer">
              <div class="px-4 h-full py-2 w-12 text-center bg-white/40 text-black font-bold">
                {monster.level}
              </div>
              <span class="px-4 h-full">
                {monster.name}
              </span>
            </div>
          </a>
        {/each}
      {/if}
      {#if monsters.length === 0}
        <div>None</div>
      {/if}
      <svelte:fragment slot="buttons">
        <LinkButton href={`/campaign/${campaignId}/monster-parts/monsters/add`}>Add :D</LinkButton>
      </svelte:fragment>
    </ContentBlock>
    <PartysItemsTable />
  </div>
  <div class="w-full">
    <h2>Recent Updates</h2>
  </div>
</div>
<AdminOnly>
  <div class="text-white mt-8 text-center">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/manage`}>Admin manage</LinkButton>
  </div>
</AdminOnly>
