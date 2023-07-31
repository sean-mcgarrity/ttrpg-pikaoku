<script lang="ts">
  import Button from '$src/components/Button.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';

  export let title;
  export let buttonText = null;
  export let href = null;
</script>

<div class=" bg-white/10 rounded pb-4 relative">
  <h2
    class="pl-4 pr-2 py-2 w-full bg-blue-600/40 rounded mb-2 flex justify-between text-lg font-medium tracking-wide"
  >
    <span class="my-auto">{title}</span>
    {#if buttonText}
      {#if href}
        <LinkButton {href}>{buttonText}</LinkButton>
      {:else}
        <Button on:click>{buttonText}</Button>
      {/if}
    {/if}
  </h2>
  <div class="px-4">
    <slot />
  </div>
</div>
