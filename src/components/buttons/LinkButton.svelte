<script lang="ts">
  import Button from './Button.svelte';

  
  interface Props {
    href?: string;
    class?: string;
    padded?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    href = '',
    class: className = '',
    padded = false,
    children
  }: Props = $props();
</script>

<a {href}>
  <Button class={className} {padded}>
    {@render children?.()}
  </Button>
</a>
