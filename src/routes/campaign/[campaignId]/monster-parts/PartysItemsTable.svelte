<script lang="ts">
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';
  import LinkButton from '$src/components/LinkButton.svelte';
  import ContentBlock from '$src/components/layout/ContentBlock.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { onMount } from 'svelte';

  $: campaignId = $page.params.campaignId;
  let supabase: SupabaseClient = $page.data.supabase;

  let loading = true;

  let items = [];
  async function getRefinedItems() {
    loading = true;
    const { data: result } = await supabase
      .from('refinements')
      .select(`*, base_item:mp_base_items (*)`)
      .eq('campaign_id', campaignId)
      .limit(10)
      .order('name', { ascending: true });
    items = result;
    loading = false;
  }

  onMount(() => {
    getRefinedItems();
  });
</script>

<ContentBlock
  title="Party's Items"
  colorClass="bg-slate-500/80"
  paddingClass="px-2 py-4"
  bind:loading
>
  {#if items.length}
    {#each items as item}
      <a href={`/campaign/${campaignId}/monster-parts/item/${item.id}`} in:slide>
        <div
          class="bg-slate-500/40 py-2 px-4 flex gap-2 items-center rounded-sm shadow hover:brightness-125 cursor-pointer"
        >
          {item.name} - {item.base_item.name} - {Math.ceil(item.base_item.cost / 100)} MP
          <span class="capitalize text-orange-400 bg-orange-400/10 px-2 py-1 rounded ml-auto">
            {item.type}
          </span>
        </div>
      </a>
    {/each}
  {/if}
  {#if items.length === 0}
    <div>None</div>
  {/if}
  <svelte:fragment slot="buttons">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/item/create`}>Create 🛠</LinkButton>
  </svelte:fragment>
</ContentBlock>
