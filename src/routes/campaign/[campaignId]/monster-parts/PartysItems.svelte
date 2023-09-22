<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import LinkButton from '$components/LinkButton.svelte';
  import ItemCardHeader from './item/[itemId]/ItemCardHeader.svelte';
  import { getRefinementsForCampaign } from '$lib/persistance/monster-parts';
  import { HammerIcon } from 'lucide-svelte';
  import Heading from '$components/layout/Heading.svelte';

  $: campaignId = $page.params.campaignId;

  $: query = getRefinementsForCampaign();
</script>

<Heading type="Section Heading">Party's items</Heading>
{#if $query.isSuccess}
  <div class=" flex flex-col gap-2">
    {#each $query.data as item}
      <a
        href={`/campaign/${campaignId}/monster-parts/item/${item.id}`}
        in:slide
        class="hover:brightness-110"
      >
        <ItemCardHeader {item} />
      </a>
    {/each}
  </div>
{/if}
<div class="flex justify-end mt-2">
  <LinkButton href={`/campaign/${campaignId}/monster-parts/item/create`}
    >Add <HammerIcon fill="white" /></LinkButton
  >
</div>
