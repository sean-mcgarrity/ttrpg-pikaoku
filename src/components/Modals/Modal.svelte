<script>
  import { run, self, createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  let { showModal = $bindable(), children } = $props();

  let dialog = $state(); // HTMLDialogElement

  run(() => {
    if (dialog && showModal) dialog.showModal();
  });
  run(() => {
    if (!showModal && dialog?.open) dialog.close();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="max-w-xl border border-campaign bg-campaign shadow rounded overflow-hidden"
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={self(() => dialog.close())}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div onclick={stopPropagation(bubble('click'))} class="">
    {@render children?.()}
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
