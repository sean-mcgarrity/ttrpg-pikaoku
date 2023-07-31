<script lang="ts">
  import { page } from '$app/stores';
  import LinkButton from '$src/components/LinkButton.svelte';
  $: console.log('page', $page);
  $: campaignId = $page.params.campaignId;
  $: itemId = $page.params.itemId;
  $: isMonsterParts = $page.url.href.includes('monster-parts');
  $: parts = [
    $page.url.href.includes('campaign') && { href: '/', text: 'Campaigns' },
    'campaignId' in $page.params && { href: `/campaign/${campaignId}`, text: campaignId },
    $page.url.href.includes('edit') && { text: 'Edit Campaign' },
    isMonsterParts && {
      href: '/campaign/1/monster-parts',
      text: 'Monster Parts'
    },
    isMonsterParts &&
      'itemId' in $page.params && {
        text: itemId,
        href: `/campaign/${campaignId}/monster-parts/${itemId}`
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
    $page.url.href.includes('manage/add-imbuement') && {
      href: `/campaign/${campaignId}/monster-parts/manage/add-imbuement`,
      text: 'Add Imbuements'
    }
  ].filter((part) => !!part);
</script>

<div class="text-white mb-4 font-light tracking-wide">
  {#each parts as { href, text }, i}
    {#if i > 0} <span class="font-medium ml-2">&gt;</span> {/if}
    {#if href}
      <LinkButton {href}>{text}</LinkButton>
    {:else}
      <span class="px-2 py-1 text-white/60">{text}</span>
    {/if}
  {/each}
</div>
