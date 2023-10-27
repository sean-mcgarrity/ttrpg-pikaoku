<script>
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
  $: if (!showModal && dialog?.open) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="max-w-xl border-8 border-blue-950 bg-white shadow rounded-xl"
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="px-8 py-4">
    <slot />
  </div>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
