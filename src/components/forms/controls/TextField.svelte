<script lang="ts">
  import cx from 'classnames';
  export let label: string = null;
  export let value: string = null;
</script>

<label class={cx(!label && 'w-full h-full')}>
  {#if label}
    <div class="text-white font-medium mb-1">{label}</div>
  {/if}
  <input
    type="text"
    {...$$restProps}
    class={cx(
      'px-4 py-1 w-full  bg-black/20 rounded shadow-inner',
      !label && 'h-full',
      $$restProps.disabled && 'bg-gray-200 bg-opacity-40 '
    )}
    bind:value
    on:change
  />
</label>
