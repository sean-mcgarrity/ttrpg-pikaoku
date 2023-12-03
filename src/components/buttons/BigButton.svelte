<script lang="ts">
  import cx from 'classnames';
  export let colorClasses = 'bg-white/80 hover:bg-white/90 active:bg-white/60 text-slate-800';
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
  export let classes = '';
</script>

<button
  {type}
  on:click
  class={cx(
    'w-full px-4 py-4 rounded shadow hover:scale-105 transition-all duration-300',
    'text-left text-xl uppercase font-medium tracking-wider select-none',
    colorClasses,
    !disabled && 'cursor-pointer',
    disabled && 'opacity-30 cursor-not-allowed pointer-events-none',
    classes
  )}
>
  <slot />
</button>
