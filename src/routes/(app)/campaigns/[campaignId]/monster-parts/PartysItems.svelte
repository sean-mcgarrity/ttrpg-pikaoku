<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import LinkButton from '$components/LinkButton.svelte';
  import ItemCardHeader from './item/[itemId]/RefinementCardHeader.svelte';
  import { getRefinementsForCampaign } from '$lib/persistance/monster-parts';
  import { ArrowRight, HammerIcon } from 'lucide-svelte';
  import GhostLoaderPatyItem from './GhostLoaderPatyItem.svelte';
  import Heading from '$components/layout/Heading.svelte';

  $: campaignId = $page.params.campaignId;

  $: query = getRefinementsForCampaign();
</script>

<div class="flex flex-col gap-4">
  <div>
    <Heading type="Section Heading">Party's items</Heading>
    <p>Your party's refined items are listed here. You can add new items or edit existing ones.</p>
  </div>
  {#if $query.isInitialLoading}
    <div class=" flex flex-col gap-2 max-w-lg w-full mx-auto">
      <GhostLoaderPatyItem />
      <GhostLoaderPatyItem />
      <GhostLoaderPatyItem />
      <GhostLoaderPatyItem />
      <GhostLoaderPatyItem />
    </div>
  {:else if $query.isSuccess}
    <div class=" flex flex-col gap-2 max-w-lg w-full mx-auto">
      {#each $query.data as item}
        <a
          href={`/campaigns/${campaignId}/monster-parts/item/${item.id}`}
          in:slide|local
          class="hover:brightness-110"
        >
          <ItemCardHeader {item} />
        </a>
      {/each}
    </div>
    {#if $query.data.length === 0}
      <div
        class="text-white text-center my-24 py-8 bg-white/10 border-2 border-white/40 flex flex-row justify-center gap-8 rounded-lg shadow mx-auto px-16 select-none"
      >
        <img
          src="https://i.imgur.com/1jtIaYV_d.webp?maxwidth=760&fidelity=grand"
          class="h-24 grayscale opacity-80 pointer-events-none"
          alt=""
        />
        <div class="my-auto">
          <p>No-one has made an item yet!</p>
          <a
            href={`/campaigns/${campaignId}/monster-parts/item/create`}
            class="text-blue-300 underline"
            >Be the first
            <ArrowRight />
          </a>
        </div>
      </div>
    {:else}
      <div class="mx-auto">
        <LinkButton href={`/campaigns/${campaignId}/monster-parts/item/create`}
          >Create item <HammerIcon fill="white" /></LinkButton
        >
      </div>
    {/if}
  {/if}
</div>
