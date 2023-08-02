<script lang="ts">
  import LoadingInsert from '$src/components/layout/LoadingInsert.svelte';
  import cx from 'classnames';
  export let title = null;
  export let colorClass = 'bg-blue-600/40';
  export let paddingClass = 'p-8';
  export let loading = false;
</script>

<div class="relative bg-white/10 rounded my-4 mx-auto max-w-2xl flex flex-col">
  {#if loading}
    <LoadingInsert />
  {/if}
  {#if title}
    <div class={cx('rounded-t px-8 py-2 text-lg font-medium tracking-wide', colorClass)}>
      {title}
    </div>
  {/if}
  <div class={cx('flex flex-col gap-2', paddingClass)}>
    <slot />
  </div>
  <div class="bg-black/10 px-2 py-2 flex flex-row gap-2 justify-end">
    <slot name="buttons" />
  </div>
</div>
