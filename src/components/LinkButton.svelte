<script lang="ts">
  import Button from '$components/Button.svelte';

  export let href = '';
  let className = '';
  export { className as class };
  export let padded = false;
</script>

<a {href}>
  <Button class={className} {padded}>
    <slot />
  </Button>
</a>
