<script lang="ts">
  import cx from 'classnames';
  import { CheckSquare, Square } from 'lucide-svelte';
  export let label: string = null;
  export let value: boolean;
</script>

<label
  class={cx(
    'flex flex-row gap-4 cursor-pointer px-2 p-1 rounded hover:bg-white/5 items-center',
    label && 'mr-auto'
  )}
>
  <input hidden type="checkbox" class="cursor-pointer rounded px-4 py-1" bind:checked={value} />
  {#if value}
    <CheckSquare />
  {:else}
    <Square />
  {/if}
  {#if label}
    <div class="text-white font-medium select-none">{label}</div>
  {/if}
</label>
