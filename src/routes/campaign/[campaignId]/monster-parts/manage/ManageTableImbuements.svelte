<script lang="ts">
  import { page } from '$app/stores';
  import ManageTable, { type ManageTableColumns } from './ManageTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { PlusCircle, Trash2Icon, Edit } from 'lucide-svelte';
  import LinkButton from '$components/LinkButton.svelte';
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

  $: rowAction = [
    {
      text: 'Edit',
      icon: Edit,
      onClick: (item) =>
        goto(`/campaign/${$page.params.campaignId}/monster-parts/manage/imbuements/${item.id}`)
    },
    {
      text: 'Delete',
      icon: Trash2Icon,
      onClick: (item) => console.log('delete', item)
    }
  ];
</script>

<ManageTable title="Imbuements" bind:loading bind:columns bind:rowActions={rowAction} bind:items>
  <LinkButton
    slot="header-button"
    href={`/campaign/${$page.params.campaignId}/monster-parts/manage/imbuements/add`}
  >
    Add <PlusCircle class="h-4 w-4 inline" />
  </LinkButton>
</ManageTable>
