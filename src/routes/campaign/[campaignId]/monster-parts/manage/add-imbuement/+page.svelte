<script lang="ts">
  import ImbuementBenefitEditor from './ImbuementBenefitEditor.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';
  import Button from '$src/components/Button.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { SupabaseClient } from '@supabase/supabase-js';

  let supabase: SupabaseClient = $page.data.supabase;

  let name = '';
  let description = '';
  let requires = '';
  let types = '';
  let effectTypes = ['levelled', 'single'];
  let effectType = effectTypes[0];
  let singleEffect = '';

  let stages = [];

  async function createImbuement() {
    const imbuement = {
      name,
      description,
      requires: requires.split(',').map((r) => r.trim()),
      types: types.split(',').map((t) => t.trim()),
      levels: stages
    };

    await supabase.from('imbuements').insert([imbuement]);
    goto(`/campaign/${$page.params.campaignId}/monster-parts/manage`);
  }
</script>

<div class="text-white">
  <div class="bg-white/10 rounded p-8 flex flex-col max-w-lg mx-auto gap-4">
    <h1 class="text-xl font-medium underline text-center">ADD IMBUEMENT</h1>
    <TextField bind:value={name} label="Name" />
    <TextField bind:value={description} label="Description" />
    <TextField bind:value={requires} label="Requires" />
    <TextField bind:value={types} label="types" />
    <div class="flex flex-col">
      <label for="effect-type">Effect Type</label>
      {#each effectTypes as et}
        <label>
          <input type="radio" bind:group={effectType} value={et} name="effect-type" />
          <span class="capitalize ml-2">{et}</span>
        </label>
      {/each}
    </div>
    {#if effectType === 'single'}
      <textarea bind:value={singleEffect} class="rounded p-2" placeholder="Effect" />
    {:else if effectType === 'levelled'}
      <ImbuementBenefitEditor bind:stages />
    {/if}
    <div class="flex justify-center mt-4">
      <Button on:click={createImbuement}>Save 💾</Button>
    </div>
  </div>
</div>
