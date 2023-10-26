<script lang="ts">
  import { page } from '$app/stores';
  import Heading from '$components/layout/Heading.svelte';
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

  $: console.log('imbuementys', $imbuementsQuery.data);
</script>

<div>
  <Heading type="Page Heading">All Imbuements</Heading>
  <p>Below lists all imbuements, a summary of their effects, and what traits they require.</p>

  <div class="mt-4">
    {#if $imbuementsQuery.isLoading}
      <div>Loading...</div>
    {:else if $imbuementsQuery.isError}
      <div>Error: {$imbuementsQuery.error.message}</div>
    {:else if $imbuementsQuery.isSuccess}
      <div class="grid grid-cols-2 gap-3">
        {#each $imbuementsQuery.data as imb}
          <div class="bg-white/90 rounded text-black p-2 flex flex-col gap-1">
            <div class="font-bold">{imb.name}</div>
            <div>{imb.description}</div>
            <div class="text-sm italic font-light mt-auto">{imb.requires.join(', ')}</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
