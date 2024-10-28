<script lang="ts">
  import cx from 'classnames';
  import { ArrowDown, ArrowUp } from 'lucide-svelte';
  interface Props {
    label?: string;
    value?: number;
    max?: number;
    min?: number;
    className?: string;
  }

  let {
    label = null,
    value = $bindable(0),
    max = null,
    min = null,
    className = ''
  }: Props = $props();

  const increment = () => {
    Math.min(value++, max);
  };

  const decrement = () => {
    Math.max(value--, min);
  };
</script>

<div class="flex flex-col gap-2 w-full">
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <div class={cx('rounded overflow-hidden bg-blue-600/40', className)}>
    <button
      onclick={increment}
      disabled={max && value >= max}
      class="w-full bg-black/20 active:bg-black/30 hover:brightness-150 disabled:bg-gray-700"
      ><ArrowUp /></button
    >
    <div class="bg-transparent py-2 w-full text-white text-center font-semibold text-xl">
      {value}
    </div>
    <button
      disabled={min && value <= min}
      onclick={decrement}
      class="w-full bg-black/20 active:bg-black/30 hover:brightness-150 disabled:bg-gray-700"
      ><ArrowDown /></button
    >
  </div>
</div>
