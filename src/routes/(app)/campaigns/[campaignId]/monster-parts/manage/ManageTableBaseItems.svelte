<script lang="ts">
  import { run } from 'svelte/legacy';

  import { page } from '$app/stores';
  import AddItemForm from './AddItemForm.svelte';
  import ManageTable, {
    type ManageTableColumns,
    type ManageTableRowAction
  } from './ManageTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import Pagination from '$components/layout/Pagination.svelte';
  import { Trash2Icon, PlusCircle } from 'lucide-svelte';
  import Button from '$components/buttons/Button.svelte';

  let supabase: SupabaseClient = $page.data.supabase;

  let items = $state([]);

  let add = $state(false);
  let loading = $state(false);

  let pageNumber = $state(1);
  const pageSize = 10;
  let totalItems = $state(0);

  let numOfPages;
  run(() => {
    numOfPages = Math.ceil(totalItems / pageSize);
  });

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

  run(() => {
    if (pageNumber) getItems();
  });

  const deleteItem = async (item) => {
    loading = true;
    await supabase.from('mp_base_items').delete().eq('key', item.key);
    getItems();
  };

  let columns: ManageTableColumns = $state([]);
  run(() => {
    columns = [
      {
        label: 'Name',
        accessor: 'name'
      },
      {
        label: 'Type',
        accessor: 'type',
        classes: 'capitalize'
      },
      {
        label: 'Cost',
        accessor: (item) => Math.ceil(item.cost / 100) + ' GP'
      },
      {
        label: 'Requires',
        accessor: 'requires',
        span: 2
      }
    ];
  });

  let rowAction: ManageTableRowAction = $state(null);
  run(() => {
    rowAction = { text: 'Delete', onClick: deleteItem, icon: Trash2Icon };
  });
</script>

<ManageTable title="Base Items" bind:loading bind:columns bind:rowActions={rowAction} bind:items>
  <!-- @migration-task: migrate this slot by hand, `header-button` is an invalid identifier -->
  <Button slot="header-button" on:click={() => (add = !add)}
    >Add <PlusCircle class="h-4 w-4 inline" /></Button
  >
  {#snippet head()}
  
      {#if add}
        <AddItemForm onCancel={() => (add = false)} onAdd={getItems} />
      {/if}
    
  {/snippet}
  {#snippet tail()}
  
      {#if numOfPages > 1}
        <div class="mx-auto">
          <Pagination
            bind:currentPage={pageNumber}
            bind:totalPages={numOfPages}
            onPageChange={(num) => (pageNumber = num)}
          />
        </div>
      {/if}
    
  {/snippet}
</ManageTable>
