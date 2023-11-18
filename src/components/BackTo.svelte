<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
  import LinkButton from './LinkButton.svelte';

  export let href: string;
  export let text: string;
</script>

<div class="my-2 -ml-2 select-none">
  <LinkButton {href} class="text-white/60 font-light tracking-wide">
    <ArrowLeft class="inline-block mr-2" /> Back to
    {text}</LinkButton
  >
</div>
