<script lang="ts">
  import BigButton from '$components/buttons/BigButton.svelte';

  export let onConfirm: () => void = null; // function
  export let onCancel: () => void = null; // function

  let open = false;

  let dialog; // HTMLDialogElement

  $: close = () => {
    if (dialog) dialog.close();
  };

  $: handleClose = () => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
    close();
  };

  $: handleConfirm = () => {
    if (!!onConfirm && typeof onConfirm === 'function') {
      onConfirm();
    }
    close();
  };

  $: if (dialog && !!open) dialog.showModal();
  $: if (!open && dialog?.open) dialog.close();
</script>

<button on:click={() => (open = true)}>
  <slot name="trigger" />
</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="max-w-none my-auto w-screen mx-0 drop-shadow-md"
  bind:this={dialog}
  on:close={() => (open = false)}
  on:click|self={handleClose}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click|stopPropagation
    class="px-8 text-center bg-cyan-800 text-3xl font-bold text-white py-12"
  >
    <slot name="message" />
    <span>Are you sure?</span>
  </div>
  <div class="px-8 py-4 text-center bg-cyan-900 flex flex-row justify-center gap-6">
    <BigButton
      classes="max-w-[12rem]"
      on:click={handleClose}
      colorClasses="bg-offwhite font-extrabold">Cancel</BigButton
    >
    <BigButton
      on:click={handleConfirm}
      colorClasses="bg-orange-700 hover:bg-orange-600 active:bg-orange-800 font-extrabold text-white"
      classes="max-w-[12rem]">Yes</BigButton
    >
  </div>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.8);
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
