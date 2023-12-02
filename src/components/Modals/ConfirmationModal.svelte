<script lang="ts">
  import BigButton from '$components/buttons/BigButton.svelte';

  export let open; // boolean
  export let onConfirm: () => void = null; // function
  export let onCancel: () => void = null; // function

  let dialog; // HTMLDialogElement

  $: handleClose = () => {
    dialog.close();
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  };

  $: handleConfirm = () => {
    console.log('insite handle confirm');
    if (!!onConfirm && typeof onConfirm === 'function') {
      console.log('actually doing it');
      onConfirm();
    }
  };

  $: if (dialog && !!open) dialog.showModal();
  $: if (!open && dialog?.open) dialog.close();
</script>

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
    class="px-8 text-center bg-gray-700 text-3xl font-bold text-white py-12"
  >
    <slot />
    <span>Are you sure?</span>
  </div>
  <div
    on:click|stopPropagation
    class="px-8 py-4 text-center bg-gray-800 flex flex-row justify-center gap-6"
  >
    <BigButton on:click={handleClose} class="px-8 text-xl text-center bg-offwhite  font-extrabold"
      >Cancel</BigButton
    >
    <BigButton
      on:click={handleConfirm}
      class="px-8 text-xl text-center bg-orange-700 text-white font-extrabold">Yes</BigButton
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
