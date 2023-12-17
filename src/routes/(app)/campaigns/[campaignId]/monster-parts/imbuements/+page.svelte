<script lang="ts">
  import cs from 'classnames';
  import { page } from '$app/stores';
  import Modal from '$components/Modals/Modal.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { extractData } from '$lib/utils/requests';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { createQuery } from '@tanstack/svelte-query';
  import { get } from 'svelte/store';
  import type { Imbuement } from 'src/app';

  let imbuementsQuery = createQuery({
    queryKey: ['imbuements', 'all'],
    queryFn: async () => {
      const currentPage = get(page);
      const supabase: SupabaseClient = currentPage.data.supabase;
      return extractData<Imbuement[]>(await supabase.from('mp_imbuements').select().order('name'));
    }
  });

  let activeImbuement: Imbuement = null;

  const categories = ['attribute', null, 'energy', 'defensive', 'spell', 'bane'];
  const categoryDescription = {
    attribute: 'Imbue a weapon with a bonus to an attribute',
    energy:
      'Imbue a weapon with additional damage based on the energy type, either by dealing more damage, apply conditions, or channelling on-theme spells',
    defensive: 'Imbue a shield or armour with a defensive bonus',
    spell: 'Imbue a weapon with the ability to cast spells',
    bane: 'Improve a weapon when fighting a specific enemy type'
  };
</script>

<div>
  <Heading type="Page Heading">Imbuements</Heading>
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
      <div class="flex flex-col gap-4">
        {#each categories as category}
          <div class="flex flex-col gap-1">
            <div class="capitalize text-xl">{category ?? 'Other'}</div>
            <div>{categoryDescription[category] ?? 'This is a mismash.'}</div>
            <div class="grid grid-cols-3 gap-3">
              {#each $imbuementsQuery.data.filter((x) => x.category === category) as imb}
                <button
                  on:click={() => {
                    activeImbuement = imb;
                  }}
                  disabled={!imb.implemented}
                  class={cs(
                    'bg-white/90 rounded text-black p-2 flex flex-col gap-1 text-left transform transition duration-300',
                    'disabled:opacity-40 enabled:hover:scale-105'
                  )}
                >
                  <div class="flex flex-row gap-4">
                    <img
                      src={imb.implemented ? imb.icon_src : 'https://i.imgur.com/g66NgKc.png'}
                      alt=""
                      class="w-8 h-8"
                    />
                    <div class="flex flex-col">
                      <div class="font-bold">{imb.name}</div>
                      <div>{imb.implemented ? imb.description : 'NOT IMPELEMENTED'}</div>
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>
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
