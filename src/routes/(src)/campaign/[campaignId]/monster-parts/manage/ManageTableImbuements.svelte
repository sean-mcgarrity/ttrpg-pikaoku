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
  import { goto } from '$app/navigation';

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
</script>

<ManageTable
  title="Imbuements"
  buttonText="Add +"
  on:click={() => goto(`/campaign/${$page.params.campaignId}/monster-parts/manage/add-imbuement`)}
>
  {#if loading}
    <div
      class="animate-pulse absolute inset-0 bg-black bg-opacity-40 m-2 rounded flex flex-row pointer-events-none"
    >
      <div class="m-auto px-16 py-8 bg-[#202020]/50 rounded text-lg">LOADING</div>
    </div>
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
