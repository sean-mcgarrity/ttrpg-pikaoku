<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import cx from 'classnames';
  interface Props {
    label?: string;
    value?: number;
    unit?: string;
  }

  let { label = null, value = $bindable(null), unit = null }: Props = $props();
</script>

<label class={cx(!label && 'w-full')}>
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <div class="flex flex-row w-full h-full">
    <input
      type="number"
      class={cx(
        'rounded-l pl-4 w-full text-black bg-white bg-opacity-80',
        !unit ? 'rounded-r' : 'pr-0',
        !label && 'h-full'
      )}
      bind:value
      onchange={bubble('change')}
    />
    {#if unit}
      <span class={cx(!label && 'h-full', 'rounded-r px-2 py-1 bg-white bg-opacity-40 select-none')}
        >{unit}</span
      >
    {/if}
  </div>
</label>
