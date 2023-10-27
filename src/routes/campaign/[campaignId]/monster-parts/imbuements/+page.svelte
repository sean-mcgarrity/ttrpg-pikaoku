<script lang="ts">
  import { page } from '$app/stores';
  import Modal from '$components/Modals/Modal.svelte';
  import BackButton from '$components/layout/BackButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import { extractData } from '$lib/utils/requests';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { createQuery } from '@tanstack/svelte-query';
  import { get } from 'svelte/store';

  let imbuementsQuery = createQuery({
    queryKey: ['imbuements', 'all'],
    queryFn: async () => {
      const currentPage = get(page);
      const supabase: SupabaseClient = currentPage.data.supabase;
      return extractData(await supabase.from('mp_imbuements').select());
    }
  });

  let activeImbuement: Imbuement = null;

  $: console.log('imbuementys', $imbuementsQuery.data);
</script>

<div>
  <Heading type="Page Heading">
    <BackButton />
    All Imbuements</Heading
  >
  <p>
    Below lists all imbuements, a summary of their effects, and what traits they require. Click an
    imbuement to see more details.
  </p>

  <div class="mt-4">
    {#if $imbuementsQuery.isLoading}
      <div>Loading...</div>
    {:else if $imbuementsQuery.isError}
      <div>Error: {$imbuementsQuery.error.message}</div>
    {:else if $imbuementsQuery.isSuccess && $imbuementsQuery.data}
      <div class="grid grid-cols-3 gap-2">
        {#each $imbuementsQuery.data as imb}
          <button
            on:click={() => {
              activeImbuement = imb;
            }}
            class="bg-white/90 rounded text-black p-2 flex flex-col gap-1 text-left"
          >
            <div class="font-bold">{imb.name}</div>
            <div>{imb.description}</div>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<Modal bind:showModal={activeImbuement}>
  {#if activeImbuement}
    <div class="bg-white/90 rounded text-black p-2 flex flex-col gap-1">
      <div class="font-bold">{activeImbuement?.name}</div>
      <div>{activeImbuement?.description}</div>
      <ul>
        {#each activeImbuement.levels as effect}
          <li>Lvl {effect.level} - {effect.preview}</li>
        {/each}
      </ul>
      <p>Requires:</p>
      <div class="italic">{activeImbuement?.requires.join(', ')}</div>
    </div>
  {/if}
</Modal>
