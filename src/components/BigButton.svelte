<script lang="ts">
  import cx from 'classnames';
  let className = '';
  export { className as class };

  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
</script>

<button
  {type}
  on:click
  class={cx(
    'bg-white/80 hover:bg-white/90 active:bg-white/60 text-slate-800 text-xl font-bold w-full px-4 py-4 tracking-wider uppercase rounded-sm',
    'text-left rounded cursor-pointer font-medium tracking-wider select-none shadow hover:scale-105',
    className,
    disabled && 'opacity-30 cursor-not-allowed pointer-events-none'
  )}
>
  <slot />
</button>
