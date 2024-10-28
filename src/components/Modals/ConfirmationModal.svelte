<script lang="ts">
  import { run, self, createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import BigButton from '$components/buttons/BigButton.svelte';

  interface Props {
    onConfirm?: () => void;
    onCancel?: () => void;
    trigger?: import('svelte').Snippet;
    message?: import('svelte').Snippet;
  }

  let {
    onConfirm = null,
    onCancel = null,
    trigger,
    message
  }: Props = $props();

  let open = $state(false);

  let dialog = $state(); // HTMLDialogElement

  let close = $derived(() => {
    if (dialog) dialog.close();
  });

  let handleClose = $derived(() => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
    close();
  });

  let handleConfirm = $derived(() => {
    if (!!onConfirm && typeof onConfirm === 'function') {
      onConfirm();
    }
    close();
  });

  run(() => {
    if (dialog && !!open) dialog.showModal();
  });
  run(() => {
    if (!open && dialog?.open) dialog.close();
  });
</script>

<button onclick={() => (open = true)}>
  {@render trigger?.()}
</button>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="max-w-none my-auto w-screen mx-0 drop-shadow-md"
  bind:this={dialog}
  onclose={() => (open = false)}
  onclick={self(handleClose)}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={stopPropagation(bubble('click'))}
    class="px-8 text-center bg-cyan-800 text-3xl font-bold text-white py-12"
  >
    {@render message?.()}
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
