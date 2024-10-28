<script lang="ts">
  import cx from 'classnames';
  interface Props {
    label?: string;
    value: string;
    options?: {
    value: string;
    text: string | number;
  }[];
    [key: string]: any
  }

  let { label = null, value = $bindable(), options = [], ...rest }: Props = $props();
</script>

<label class={cx(!label && 'w-full')}>
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <select
    {...rest}
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
