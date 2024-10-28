<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import cx from 'classnames';
  interface Props {
    label?: string;
    value?: string;
    rows?: number;
    [key: string]: any
  }

  let { label = null, value = $bindable(null), rows = 3, ...rest }: Props = $props();
</script>

<label class={cx(!label && 'w-full h-full')}>
  {#if label}
    <div class="font-medium mb-1">{label}</div>
  {/if}
  <textarea
    {...rest}
    {rows}
    class={cx(
      'rounded px-4 py-1 w-full bg-black/20 shadow-inner',
      !label && 'h-full',
      rest.disabled && 'bg-gray-200 bg-opacity-40 '
    )}
    bind:value
    onchange={bubble('change')}
></textarea>
</label>
