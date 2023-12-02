<script lang="ts">
  import { page } from '$app/stores';
  import ManageTable, { type ManageTableColumns } from './ManageTable.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { PlusCircle, Trash2Icon, Edit } from 'lucide-svelte';
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import { goto } from '$app/navigation';
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { duplicateImbuement } from '$lib/persistance/monster-parts';

  let supabase: SupabaseClient = $page.data.supabase;
  let pageNumber = 1;
  const pageSize = 10;

  let getImbuements = createQuery<any, any, any>({
    queryKey: ['imbuements', 'all'],
    queryFn: async () => {
      const { data: result, count } = await supabase
        .from('mp_imbuements')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true });
      return { result, count };
    }
  });

  $: items = $getImbuements.data?.result ?? [];

  let deleteImbuement = createMutation<any, any, Record<'id', string>>({
    mutationKey: ['imbuement', 'delete'],
    mutationFn: async ({ id }) => {
      await supabase.from('mp_imbuements').delete().eq('id', id);
    },
    onSuccess: () => $getImbuements.refetch()
  });

  let duplicateImbuementMutation = duplicateImbuement();

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
      accessor: (x) => x.requires.join(', '),
      span: 1
    }
  ];

  $: rowAction = [
    {
      text: 'Dupe',
      icon: PlusCircle,
      onClick: (item) => $duplicateImbuementMutation.mutate(item.id)
    },
    {
      text: 'Edit',
      icon: Edit,
      onClick: (item) =>
        goto(`/campaigns/${$page.params.campaignId}/monster-parts/manage/imbuements/${item.id}`)
    },
    {
      text: 'Delete',
      icon: Trash2Icon,
      onClick: (item) => $deleteImbuement.mutate({ id: item.id })
    }
  ];
</script>

<ManageTable
  title="Imbuements"
  bind:loading={$getImbuements.isFetching}
  bind:columns
  bind:rowActions={rowAction}
  bind:items
>
  <LinkButton
    slot="header-button"
    href={`/campaigns/${$page.params.campaignId}/monster-parts/manage/imbuements/add`}
  >
    Add <PlusCircle class="h-4 w-4 inline" />
  </LinkButton>
</ManageTable>
