<script lang="ts">
  import { run } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import BackButton from '$components/layout/BackButton.svelte';
  import EditImbuementForm from '../ImbuementEditor.svelte';

  let supabase: SupabaseClient = $page.data.supabase;
  let newImbuement: Imbuement = {
    id: 7920386472380,
    description: '',
    name: '',
    type: 'armor',
    requires: [],
    levels: [],
    enabled: true
  };

  async function createImbuement(imbuement: Imbuement) {
    const { id, ...withoutId } = imbuement;
    await supabase.from('mp_imbuements').insert([{ ...withoutId }]);
    goto(`/campaigns/${$page.params.campaignId}/monster-parts/manage`);
  }

  run(() => {
    newImbuement;
  });
  run(() => {
    newImbuement.levels;
  });
</script>

<div class="text-white">
  <div class="flex items-center mb-6">
    <BackButton />
    <h1 class="inline text-3xl font-medium">Add imbuement</h1>
  </div>
  <EditImbuementForm imbuement={newImbuement} onSave={createImbuement} />
</div>
