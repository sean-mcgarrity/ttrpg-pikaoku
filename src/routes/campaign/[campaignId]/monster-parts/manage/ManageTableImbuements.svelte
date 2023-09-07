<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import ManageTable, {
    type ManageTableColumns,
    type ManageTableRowAction
  } from './ManageTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import Pagination from '$components/layout/Pagination.svelte';
  import { goto } from '$app/navigation';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { PlusCircle, Trash2Icon } from 'lucide-svelte';
  import LinkButton from '$components/LinkButton.svelte';

  let supabase: SupabaseClient = $page.data.supabase;
  let items = [];
  let loading = false;
  let pageNumber = 1;
  const pageSize = 10;
  let totalItems = 0;

  $: numOfPages = Math.ceil(totalItems / pageSize);

  const getItems = async () => {
    loading = true;
    const { data: result, count } = await supabase
      .from('imbuements')
      .select('*', { count: 'exact' })
      .order('name', { ascending: true })
      .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);
    items = result;
    totalItems = count;
    loading = false;
  };

  $: if (pageNumber) getItems();

  // const deleteItem = async (item) => {
  //   loading = true;
  //   await supabase.from('mp_base_items').delete().eq('key', item.key);
  //   getItems();
  // };

  let columns: ManageTableColumns = [];
  $: columns = [
    {
      label: 'Name',
      accessor: 'name'
    },
    {
      label: 'Description',
      accessor: 'description'
    },
    {
      label: 'Requires',
      accessor: 'requires',
      span: 1
    }
  ];

  $: rowAction = {
    text: 'Delete',
    icon: Trash2Icon,
    onClick: (item) => console.log('delete', item)
  };
</script>

<ManageTable title="Imbuements" bind:loading bind:columns bind:rowAction bind:items>
  <LinkButton
    slot="header-button"
    href={`/campaign/${$page.params.campaignId}/monster-parts/manage/imbuements/add`}
  >
    Add <PlusCircle class="h-4 w-4 inline" />
  </LinkButton>
  {#if loading}
    <LoadingInsert />
  {/if}
  {#if items.length}
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-5 gap-4 font-medium text-lg underline">
        <div>Name</div>
        <div class="col-span-3">Requires</div>
      </div>
      {#each items as item}
        <div class="grid grid-cols-5 gap-4 px-2 py-1 rounded even:bg-black/10 items-center">
          <div>{item.name}</div>
          <div class="col-span-3">{item.description}</div>
          <div class="flex flex-row justify-end gap-2">
            <Button on:click={() => console.log('delete', item)}>Delete</Button>
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
