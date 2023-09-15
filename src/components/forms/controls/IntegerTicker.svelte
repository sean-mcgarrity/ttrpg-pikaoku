<script lang="ts">
  import cx from 'classnames';
  import { ArrowDown, ArrowUp } from 'lucide-svelte';
  export let label: string = null;
  export let value: number = 0;
  export let max: number = null;
  export let min: number = null;
  export let className: string = '';

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
      on:click={increment}
      disabled={max && value >= max}
      class="w-full bg-black/20 active:bg-black/30 hover:brightness-150 disabled:bg-gray-700"
      ><ArrowUp /></button
    >
    <div class="bg-transparent py-2 w-full text-white text-center font-semibold text-xl">
      {value}
    </div>
    <button
      disabled={min && value <= min}
      on:click={decrement}
      class="w-full bg-black/20 active:bg-black/30 hover:brightness-150 disabled:bg-gray-700"
      ><ArrowDown /></button
    >
  </div>
</div>
