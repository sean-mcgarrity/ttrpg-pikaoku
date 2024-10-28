<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import PartysItemsTable from './PartysItems.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LandingLink from '$components/buttons/BigLink.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';

  let campaignId = $derived($page.params.campaignId);
</script>

<div class="flex flex-col gap-8">
  <div class="">
    <Heading type="Page Heading">Monster Parts Subsystem</Heading>
    <p>
      This subsystem is designed to help you keep track of the monster parts your party has
      collected, and what they can do with them.
    </p>
  </div>
  <PartysItemsTable />
  <div class="flex flex-col sm:flex-row gap-4 justify-around mt-12 max-w-3xl w-full mx-auto">
    <LandingLink
      class="flex-1"
      title="Imbuements"
      href={`/campaigns/${campaignId}/monster-parts/imbuements`}
      bgImgSrc="https://i.imgur.com/HWqYImt.jpg"
    />
    <LandingLink
      class="flex-1"
      title="Monsters"
      href={`/campaigns/${campaignId}/monster-parts/monsters`}
      bgImgSrc="https://i.imgur.com/OEY4Ixd.jpg"
    />
  </div>
  <AdminOnly>
    <div class="text-white mt-8 text-center">
      <LinkButton href={`/campaigns/${campaignId}/monster-parts/manage`}>Admin manage</LinkButton>
    </div>
  </AdminOnly>
</div>
