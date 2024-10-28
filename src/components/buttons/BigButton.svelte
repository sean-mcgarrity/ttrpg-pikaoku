<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import cx from 'classnames';
  interface Props {
    colorClasses?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    classes?: string;
    children?: import('svelte').Snippet;
  }

  let {
    colorClasses = 'bg-white/80 hover:bg-white/90 active:bg-white/60 text-slate-800',
    type = 'button',
    disabled = false,
    classes = '',
    children
  }: Props = $props();
</script>

<button
  {type}
  onclick={bubble('click')}
  class={cx(
    'w-full px-4 py-4 rounded shadow hover:scale-105 transition-all duration-300',
    'text-left text-xl uppercase font-medium tracking-wider select-none',
    colorClasses,
    !disabled && 'cursor-pointer',
    disabled && 'opacity-30 cursor-not-allowed pointer-events-none',
    classes
  )}
>
  {@render children?.()}
</button>
