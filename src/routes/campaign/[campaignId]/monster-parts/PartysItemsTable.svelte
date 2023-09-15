<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import LinkButton from '$components/LinkButton.svelte';
  import ContentBlock from '$components/layout/ContentBlock.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import ItemCardHeader from './item/[itemId]/ItemCardHeader.svelte';
  import { getRefinementsForCampaign } from '$lib/persistance/monster-parts';

  $: campaignId = $page.params.campaignId;

  $: query = getRefinementsForCampaign();
</script>

<ContentBlock
  title="Party's Items"
  colorClass="bg-slate-500/80"
  paddingClass="px-2 py-4"
  loading={$query.isLoading}
>
  {#if $query.data.length}
    {#each $query.data as item}
      <a
        href={`/campaign/${campaignId}/monster-parts/item/${item.id}`}
        in:slide
        class="hover:brightness-110"
      >
        <ItemCardHeader {item} />
      </a>
    {/each}
  {:else if $query.data.length === 0}
    <div>None</div>
  {/if}

  <svelte:fragment slot="buttons">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/item/create`}>Create 🛠</LinkButton>
  </svelte:fragment>
</ContentBlock>
