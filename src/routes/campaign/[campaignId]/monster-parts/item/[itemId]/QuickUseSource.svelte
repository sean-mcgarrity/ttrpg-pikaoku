<script lang="ts">
  import cx from 'classnames';
  import type { MP_UsableSource } from '$lib/systems/pf2e_monster_parts';
  import Button from '$components/Button.svelte';
  import { slide } from 'svelte/transition';
  import { Hammer } from 'lucide-svelte';

  export let source: MP_UsableSource;
  export let buttonText: string = 'Refine';
  export let actionText: string = 'Refining';
  export let onClick: (amount: number) => void;

  let expanded = false;
  let value = source.usable;

  $: if (value > source.usable) value = source.usable;
</script>

<div
  class={cx(
    'shadow rounded overflow-hidden select-none text-left w-full',
    buttonText === 'Refine' ? 'bg-yellow-500/60' : 'bg-blue-400/60'
  )}
>
  <button class={cx('w-full text-left')} on:click={() => (expanded = !expanded)}>
    <div class="p-2 bg-black/20 w-full">{actionText}</div>
    <div
      class={cx('flex flex-row justify-between w-full gap-2 hover:brightness-125 cursor-pointer')}
    >
      <div class="p-2 mr-auto">{source.name}</div>
      <div class="p-2">{source.usable} MP</div>
    </div>
  </button>
  {#if expanded}
    <div class="p-2 bg-black/30 rounded-b flex flex-row gap-4" transition:slide|local>
      <input
        type="range"
        min="1"
        max={source.usable}
        bind:value
        class="quick-use-slider w-full my-auto accent-gray-600"
      />
      <div class="min-w-[2rem] my-auto">{value}</div>
      <Button on:click={() => onClick(value)}>{buttonText} <Hammer /></Button>
    </div>
  {/if}
</div>
