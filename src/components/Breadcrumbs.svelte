<script lang="ts">
  import { page } from '$app/stores';
  import LinkButton from '$components/LinkButton.svelte';
  $: campaignId = $page.params.campaignId;
  $: itemId = $page.params.itemId;
  $: isMonsterParts = $page.url.href.includes('monster-parts');
  $: parts = [
    $page.url.href.includes('campaign') && { href: '/', text: 'Campaigns' },
    'campaignId' in $page.params && {
      href: `/campaign/${campaignId}`,
      text: $page.data.campaign.slug
    },
    $page.url.href.includes('edit') && { text: 'Edit Campaign' },
    isMonsterParts && {
      href: `/campaign/${campaignId}/monster-parts`,
      text: 'Monster Parts'
    },
    isMonsterParts &&
      'itemId' in $page.params && {
        text: itemId
      },
    isMonsterParts &&
      $page.url.href.includes('manage') && {
        href: `/campaign/${campaignId}/monster-parts/manage`,
        text: 'Manage'
      },
    $page.url.href.includes('manage/add-base-item') && {
      href: `/campaign/${campaignId}/monster-parts/manage/add-base-item`,
      text: 'Add Base Item'
    },
    $page.url.href.includes('item/create') && {
      href: `/campaign/${campaignId}/monster-parts/item/create`,
      text: 'Creating Item'
    },
    $page.url.href.includes('monster-parts/monsters') && {
      href: `/campaign/${campaignId}/monster-parts/monsters`,
      text: 'Monsters'
    },
    $page.url.href.includes('monsters/add') && {
      href: `/campaign/${campaignId}/monster-parts/monsters/add`,
      text: 'Adding Monster'
    },
    'sourceId' in $page.params &&
      !$page.url.href.includes('/edit') && {
        href: `/campaign/${campaignId}/monster-parts/monsters/${$page.params.sourceId}`,
        text: 'Viewing Monster'
      },
    'sourceId' in $page.params &&
      $page.url.href.includes('/edit') && {
        href: `/campaign/${campaignId}/monster-parts/monsters/${$page.params.sourceId}`,
        text: 'Editing Monster'
      }
  ].filter((part) => !!part);
</script>

<div class="text-white my-2 -ml-2 select-none">
  {#each parts as { href, text }, i}
    {#if i > 0} <span class="font-medium ml-2">/</span> {/if}
    {#if href}
      <LinkButton {href} class="text-white/60 font-light tracking-wide">{text}</LinkButton>
    {:else}
      <span class="px-2 py-1 text-white/60 font-light tracking-wide">{text}</span>
    {/if}
  {/each}
</div>
