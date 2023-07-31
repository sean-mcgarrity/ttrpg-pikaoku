<script>
  import ManageTable from './ManageTable.svelte';
  import BaseItemsTable from './BaseItemsTable.svelte';
</script>

<div class="text-white flex flex-col gap-4">
  <h1 class="text-2xl">Manage Monster Parts</h1>
  <BaseItemsTable />
  <ManageTable
    title="Imbuement"
    buttonText="Add +"
    href="/campaign/1/monster-parts/manage/add-imbuement"
  >
    <div>Imbuement</div>
    <div>Imbuement</div>
    <div>Imbuement</div>
  </ManageTable>
</div>
