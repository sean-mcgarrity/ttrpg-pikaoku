<script lang="ts">
  import cx from 'classnames';
  export let label: string = null;
  export let value: string;
  export let options: {
    value: string;
    text: string | number;
  }[] = [];
</script>

<label class={cx(!label && 'w-full')}>
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <select
    {...$$restProps}
    class={cx('rounded px-4 py-1 w-full text-black bg-white bg-opacity-80', !label && 'h-full')}
    bind:value
  >
    {#if options.length}
      {#each options as option}
        <option value={option.value}>{option.text}</option>
      {/each}
    {/if}
  </select>
</label>
