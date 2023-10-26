<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import PartysItemsTable from './PartysItems.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import UsableMonsters from './UsableMonsters.svelte';
  import LandingLink from '$components/LandingLink.svelte';

  $: campaignId = $page.params.campaignId;
</script>

<Heading type="Page Heading">Monster Parts</Heading>
<div class="text-white flex flex-col md:flex-row gap-4">
  <div class="w-full">
    <PartysItemsTable />
  </div>
</div>
<div class="flex flex-col sm:flex-row gap-4 justify-around">
  <LandingLink
    class="flex-1"
    title="Imbuements"
    href={`/campaign/${campaignId}/monster-parts/imbuements`}
    bgImgSrc="https://i.imgur.com/HWqYImt.jpg"
  />
  <LandingLink
    class="flex-1"
    title="Monsters"
    href={`/campaign/${campaignId}/monster-parts/monsters`}
    bgImgSrc="https://i.imgur.com/OEY4Ixd.jpg"
  />
</div>
<UsableMonsters />
<AdminOnly>
  <div class="text-white mt-8 text-center">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/manage`}>Admin manage</LinkButton>
  </div>
</AdminOnly>
