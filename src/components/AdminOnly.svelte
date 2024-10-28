<script lang="ts">
  import { run } from 'svelte/legacy';

  import { page } from '$app/stores';
  import { isAdmin } from '$lib/utils/auth';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let admin = $state(false);
  run(() => {
    admin = isAdmin($page.data.session);
  });
</script>

{#if admin}
  {@render children?.()}
{/if}
