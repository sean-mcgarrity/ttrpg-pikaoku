<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$src/components/AdminOnly.svelte';
  import Button from '$src/components/Button.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import ContentBlock from '$src/components/layout/ContentBlock.svelte';
  import CreateMpMonster from '$src/routes/(src)/campaign/[campaignId]/monster-parts/CreateMpMonster.svelte';
  import PartysItemsTable from '$src/routes/(src)/campaign/[campaignId]/monster-parts/PartysItemsTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { onMount } from 'svelte';

  $: campaignId = $page.params.campaignId;
  let supabase: SupabaseClient = $page.data.supabase;

  let monsters: any[] = [
    {
      name: 'Monstro',
      level: 1,
      revealed: false,
      flags: []
    },
    {
      name: 'Orc',
      level: 4,
      revealed: false,
      flags: []
    },
    {
      name: 'Warthog',
      level: 12,
      revealed: false,
      flags: []
    }
  ];

  const addNewMonster = (monster: any) => {
    monsters = [...monsters, monster];
  };

  let items = [];
  async function getRefinedItems() {
    const { data: result } = await supabase
      .from('refinements')
      .select(`*, base_item:mp_base_items (*)`)
      .eq('campaign_id', campaignId)
      .limit(10)
      .order('name', { ascending: true });
    console.log('items', result);
    items = result;
  }

  onMount(() => {
    getRefinedItems();
  });
</script>

<div class="text-white flex flex-col md:flex-row gap-4">
  <div class="w-full">
    <h1 class="font-bold mb-4">Monster Parts</h1>
    <ContentBlock title="Unused Monsters" colorClass="bg-red-500/40" paddingClass="px-2 py-4">
      {#if monsters.length}
        {#each monsters as monster}
          <div class="bg-white/20 flex rounded overflow-hidden items-center cursor-pointer">
            <div class="px-4 h-full py-2 w-12 text-center bg-white/40 text-black font-bold">
              {monster.level}
            </div>
            <span class="px-4 h-full">
              {monster.name}
            </span>
          </div>
        {/each}
      {/if}
      {#if monsters.length === 0}
        <div>None</div>
      {/if}
      <svelte:fragment slot="buttons">
        <LinkButton href={`/campaign/${campaignId}/monster-parts/add-monster`}>Add :D</LinkButton>
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
