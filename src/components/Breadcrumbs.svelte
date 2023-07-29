<script lang="ts">
  import { page } from '$app/stores';
  $: console.log('page', $page);
</script>

<div class="text-white mb-4 font-light tracking-wide text-sm">
  {#if $page.url.href.includes('campaign')}
    <a href="/" class="hover:underline">campaigns</a>
  {/if}
  {#if 'campaignId' in $page.params}
    / <a href="/" class="hover:underline">{$page.params.campaignId}</a>
  {/if}
  {#if $page.url.href.includes('edit')}
    / <span>edit</span>
  {/if}
</div>
