<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import SelectField from '$components/forms/controls/SelectField.svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { slide } from 'svelte/transition';

  let supabase: SupabaseClient = $page.data.supabase;

  let key = '';
  let name = '';
  let type = 'weapon';
  let cost = 1;
  let requires = '';
  let autoKey = true;

  $: autoGenKey = name
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .toLowerCase();

  const reset = () => {
    key = '';
    name = '';
    type = 'weapon';
    cost = 1;
    requires = '';
  };

  export let onCancel: () => void = () => console.log('Cancelled adding item');
  export let onAdd: (item) => void = () => console.log('Added item');

  const handleCancel = () => {
    onCancel();
  };

  const createItem = async () => {
    const newItem = {
      key: autoKey ? autoGenKey : key,
      description: '',
      name,
      type,
      cost,
      requires: requires.split(',')
    };
    await supabase.from('mp_base_items').insert([newItem]);
    onAdd(newItem);
  };
</script>

<div class="flex flex-row gap-2 my-4 border-b-2 border-white/30 border-solid pb-4" transition:slide>
  <div class="w-1/5 flex flex-col gap-2">
    <TextField bind:value={name} placeholder="Item Name" />
    <div class="flex flex-row h-full rounded bg-white/10">
      <SwitchField bind:value={autoKey} />
      <TextField
        disabled
        bind:value={key}
        placeholder={autoKey ? autoGenKey || 'Generated Key' : 'Item Key'}
      />
    </div>
  </div>
  <div class="flex-1 flex flex-col gap-2">
    <TextField value={''} placeholder="Description" />
    <TextField bind:value={requires} placeholder="Requires" />
  </div>
  <div class="w-1/5 flex flex-col gap-2">
    <NumberField bind:value={cost} unit="CP" />
    <SelectField
      bind:value={type}
      options={[
        { value: 'weapon', text: 'Weapon' },
        { value: 'armor', text: 'Armor' },
        { value: 'shield', text: 'Shield' },
        { value: 'skill', text: 'Skill' },
        { value: 'perception', text: 'Perception' }
      ]}
    />
  </div>
  <div class="flex flex-col justify-between">
    <Button on:click={createItem}>Save</Button>
    <Button on:click={handleCancel}>Cancel</Button>
  </div>
</div>
