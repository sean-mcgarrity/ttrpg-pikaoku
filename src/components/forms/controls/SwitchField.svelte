<script lang="ts">
  import cx from 'classnames';
  export let label: string = null;
  export let value: boolean;
</script>

<label
  class={cx(
    'flex flex-row gap-4 cursor-pointer px-4 py-2 rounded hover:bg-white hover:bg-opacity-10',
    label && 'mr-auto'
  )}
>
  <input type="checkbox" class="cursor-pointer rounded px-4 py-1" bind:checked={value} />
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
</label>
