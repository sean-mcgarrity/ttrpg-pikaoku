<script lang="ts">
  import cx from 'classnames';
  export let label: string = null;
  export let value: string = null;
</script>

<label class={cx(!label && 'w-full h-full')}>
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <input
    {...$$restProps}
    type="text"
    class={cx(
      'rounded px-4 py-1 w-full text-black bg-white bg-opacity-90 placeholder:text-black/40',
      !label && 'h-full',
      $$restProps.disabled && 'bg-gray-200 bg-opacity-40 '
    )}
    bind:value
    on:change
  />
</label>
