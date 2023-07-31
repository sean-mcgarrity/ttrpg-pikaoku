<script lang="ts">
  import { page } from '$app/stores';
  import LinkButton from '$src/components/LinkButton.svelte';
  $: console.log('page', $page);
</script>

<div class="text-white mb-4 font-light tracking-wide">
  {#if $page.url.href.includes('campaign')}
    <LinkButton href="/">Campaigns</LinkButton>
  {/if}
  {#if 'campaignId' in $page.params}
    <span class="font-medium">/</span> <LinkButton href="/">{$page.params.campaignId}</LinkButton>
  {/if}
  {#if $page.url.href.includes('edit')}
    <span class="font-medium">/</span> <span class="text-white/80">Edit Campaign</span>
  {/if}
  {#if $page.url.href.includes('monster-parts')}
    <span class="font-medium">/</span> <span class="px-2 text-white/80">Monster Parts</span>
  {/if}
</div>
