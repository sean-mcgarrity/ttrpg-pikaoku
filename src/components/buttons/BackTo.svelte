<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
  import LinkButton from './LinkButton.svelte';

  interface Props {
    href: string;
    text: string;
  }

  let { href, text }: Props = $props();
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
