<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$src/components/Button.svelte';
  import NumberField from '$src/components/forms/controls/NumberField.svelte';
  import SelectField from '$src/components/forms/controls/SelectField.svelte';
  import SwitchField from '$src/components/forms/controls/SwitchField.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';
  import ManageTable from '$src/routes/(src)/campaign/[campaignId]/monster-parts/manage/ManageTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import Pagination from '$src/components/layout/Pagination.svelte';

  let supabase: SupabaseClient = $page.data.supabase;

  let items = [];
  let add = true;

  let loading = false;

  let key = '';
  let name = '';
  let type = 'weapon';
  let cost = 1;
  let requires = '';
  let autoKey = true;

  let pageNumber = 1;
  const pageSize = 10;
  let totalItems = 0;

  $: numOfPages = Math.ceil(totalItems / pageSize);
  $: autoGenKey = name
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .toLowerCase();

  $: console.log('page number', pageNumber);

  const getItems = async () => {
    loading = true;
    const { data: result, count } = await supabase
      .from('mp_base_items')
      .select('*', { count: 'exact' })
      .order('name', { ascending: true })
      .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);
    items = result;
    totalItems = count;
    loading = false;
  };

  $: if (pageNumber) getItems();

  const reset = () => {
    key = '';
    name = '';
    type = 'weapon';
    cost = 1;
    requires = '';
  };

  const handleCancel = () => {
    reset();
    add = false;
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
    loading = true;
    await supabase.from('mp_base_items').insert([newItem]);
    getItems();
    reset();
    add = false;
  };

  const deleteItem = async (item) => {
    loading = true;
    await supabase.from('mp_base_items').delete().eq('key', item.key);
    getItems();
  };
</script>

<ManageTable title="Base Items" buttonText="Add +" on:click={() => (add = true)}>
  {#if loading}
    <div
      class="animate-pulse absolute inset-0 bg-black bg-opacity-40 m-2 rounded flex flex-row pointer-events-none"
    >
      <div class="m-auto px-16 py-8 bg-[#202020]/50 rounded text-lg">LOADING</div>
    </div>
  {/if}
  {#if add}
    <div class="flex flex-row gap-2 my-4 border-b-2 border-white/30 border-solid pb-4">
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
  {/if}
  {#if items.length}
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-8 gap-4 font-medium text-lg underline">
        <div>Key</div>
        <div>Name</div>
        <div>Cost</div>
        <div>Type</div>
        <div class="col-span-3">Requires</div>
      </div>
      {#each items as item}
        <div class="grid grid-cols-8 gap-4 px-2 py-1 rounded even:bg-black/10">
          <div>{item.key}</div>
          <div>{item.name}</div>
          <div>{item.cost}</div>
          <div>{item.type}</div>
          <div class="col-span-3">{item.requires.join(',')}</div>
          <div class="flex flex-row justify-end gap-2">
            <Button on:click={() => deleteItem(item)}>Delete</Button>
          </div>
        </div>
      {/each}
      {#if numOfPages > 1}
        <Pagination
          bind:currentPage={pageNumber}
          bind:totalPages={numOfPages}
          onPageChange={(num) => (pageNumber = num)}
        />
      {/if}
    </div>
  {:else}
    <div class="text-white/60">No items</div>
  {/if}
</ManageTable>
