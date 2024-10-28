<script lang="ts">
  interface Props {
    href: any;
    active?: boolean;
    children?: import('svelte').Snippet;
  }

  let { href, active = true, children }: Props = $props();
</script>

{#if active && href}
  <a {href}>
    {@render children?.()}
  </a>
{:else}
  {@render children?.()}
{/if}
