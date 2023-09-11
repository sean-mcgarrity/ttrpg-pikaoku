<script lang="ts">
  import ImbuementBenefitEditor from './ImbuementBenefitEditor.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Button from '$components/Button.svelte';
  import { Save } from 'lucide-svelte';

  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import Toggle from '$components/forms/controls/Toggle.svelte';
  import ItemTypeSelector from '$components/monster-parts/ItemTypeSelector.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';

  export let imbuement: Imbuement;
  export let onSave: (imbuement: Partial<Imbuement>) => void;

  let name = imbuement.name;
  let description = imbuement.description;
  let requires = imbuement.requires.join(', ');
  let type = imbuement.type;
  let effectTypes = ['levelled', 'single'];
  let effectType = imbuement.levels.length > 0 ? 'levelled' : 'single';
  let singleEffect = '';

  console.log('ITEM TYPE', type);

  const handleSave = () => {
    // TODO: Validate the data.
    const imbuement: Omit<Imbuement, 'id' | 'types'> = {
      name,
      description,
      requires: requires.split(',').map((r) => r.trim()),
      type: 'armor',
      levels: stages,
      enabled: true
    };

    if (onSave) {
      console.log('final imbuement', imbuement);
      onSave(imbuement);
    }
  };

  $: stages = imbuement.levels;
</script>

<div class="text-white grid grid-cols-2 gap-4">
  <div class="flex flex-col max-w-lg gap-4">
    <div class="flex flex-col gap-4 p-4 bg-blue-600/40 rounded shadow">
      <TextField bind:value={name} label="Name" />
      <TextAreaField bind:value={description} label="Description" />
    </div>
    <div class="flex flex-col max-w-lg gap-4 p-4 bg-blue-600/40 rounded shadow">
      <TextField bind:value={requires} label="Requires" />
      <ItemTypeSelector bind:value={type} />
    </div>
    <div class="flex justify-center mt-4">
      <Button on:click={handleSave}>Save <Save /></Button>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div class="max-w-lg p-4 bg-blue-600/20 rounded shadow">
      <Toggle bind:value={effectType} label="Effect type" design="multi" options={effectTypes} />
    </div>
    {#if effectType === 'single'}
      <textarea bind:value={singleEffect} class="rounded p-2" placeholder="Effect" />
    {:else if effectType === 'levelled'}
      <ImbuementBenefitEditor bind:stages />
    {/if}
  </div>
</div>
