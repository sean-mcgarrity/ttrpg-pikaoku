<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte';
  import { Undo } from 'lucide-svelte';

  export let destination: string = '/';
  export let explanation: string = null;
</script>

<div class="px-8 py-4 bg-red-400/20 rounded-lg shadow flex flex-col gap-4 mx-auto max-w-md">
  <h1 class="text-2xl">Oops! Something went wrong...</h1>
  {#if explanation}
    <p>{explanation}</p>
  {:else}
    <p>It seems like something went wrong. Please try again later.</p>
  {/if}
  <LinkButton class="mx-auto inline-block" href={destination}><Undo /> Go to safety</LinkButton>
</div>
