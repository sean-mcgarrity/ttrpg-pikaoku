<script lang="ts">
  export let href;
  export let active = true;
</script>

{#if active && href}
  <a {href}>
    <slot />
  </a>
{:else}
  <slot />
{/if}
