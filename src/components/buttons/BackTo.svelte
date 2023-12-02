<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
  import LinkButton from './LinkButton.svelte';

  export let href: string;
  export let text: string;
</script>

<div class="my-2 -ml-2 select-none">
  <LinkButton {href} class=" font-light tracking-wide">
    <ArrowLeft class="inline-block text-white" />
    <span class="text-white/60"
      >Back to
      {text}</span
    ></LinkButton
  >
</div>
