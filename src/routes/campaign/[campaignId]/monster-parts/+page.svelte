<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import PartysItemsTable from './PartysItems.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import UsableMonsters from './UsableMonsters.svelte';

  $: campaignId = $page.params.campaignId;
</script>

<Heading type="Page Heading">Monster Parts</Heading>
<div class="text-white flex flex-col md:flex-row gap-4">
  <div class="w-full">
    <PartysItemsTable />
  </div>
  <div class="w-full">
    <UsableMonsters />
  </div>
</div>
<div>
  <a
    href={`
    /campaign/${campaignId}/monster-parts/imbuements
  `}
    class="text-white text-center block bg-gray-800 p-4 rounded shadow transform transition duration-300 hover:scale-105"
  >
    <div class="text-2xl">
      <div>All Imbuements</div>
    </div></a
  >
</div>
<AdminOnly>
  <div class="text-white mt-8 text-center">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/manage`}>Admin manage</LinkButton>
  </div>
</AdminOnly>
