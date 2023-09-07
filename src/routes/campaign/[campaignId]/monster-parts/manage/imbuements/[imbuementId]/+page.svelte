<script lang="ts">
  import EditImbuementForm from '../EditImbuementForm.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import BackButton from '$components/layout/BackButton.svelte';

  const newImbuement: Imbuement = {
    id: 7920386472380,
    description: '',
    name: '',
    types: ['armor'],
    type: 'armor',
    requires: [],
    levels: [],
    enabled: true
  };

  const onSave = () => alert('saved!');
</script>

<div class="text-white text-left">
  <div class="flex items-center mb-6">
    <BackButton />
    <h1 class="inline text-3xl font-medium">Edit imbuement</h1>
  </div>
  <EditImbuementForm imbuement={newImbuement} {onSave} />
</div>
