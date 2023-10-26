<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import LinkButton from '$components/LinkButton.svelte';
  import ItemCardHeader from './item/[itemId]/ItemCardHeader.svelte';
  import { getRefinementsForCampaign } from '$lib/persistance/monster-parts';
  import { ArrowRight, HammerIcon, Link2, Navigation } from 'lucide-svelte';
  import Heading from '$components/layout/Heading.svelte';

  $: campaignId = $page.params.campaignId;

  $: query = getRefinementsForCampaign();
</script>

<div class="flex flex-col gap-4">
  <div>
    <Heading type="Section Heading">Party's items</Heading>
    <p>Your party's refined items are listed here. You can add new items or edit existing ones.</p>
  </div>
  {#if $query.isSuccess}
    <div class=" flex flex-col gap-2 max-w-lg w-full mx-auto">
      {#each $query.data as item}
        <a
          href={`/campaign/${campaignId}/monster-parts/item/${item.id}`}
          in:slide|local
          class="hover:brightness-110"
        >
          <ItemCardHeader {item} />
        </a>
      {/each}
    </div>
    {#if $query.data.length === 0}
      <div class="text-white text-center my-24 py-8">
        <p>No-one has made an item yet!</p>
        <a
          href={`/campaign/${campaignId}/monster-parts/item/create`}
          class="text-blue-400 underline"
          >Be the first
          <ArrowRight />
        </a>
      </div>
    {:else}
      <div class="mx-auto">
        <LinkButton href={`/campaign/${campaignId}/monster-parts/item/create`}
          >Create item <HammerIcon fill="white" /></LinkButton
        >
      </div>
    {/if}
  {/if}
</div>
