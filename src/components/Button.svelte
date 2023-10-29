<script lang="ts">
  import cx from 'classnames';
  let className = '';
  export { className as class };

  export let padded = false;
  export let type: 'button' | 'submit' = 'button';
  export let outlined = false;
  export let disabled = false;
  export let dark = false;
</script>

<button
  {type}
  on:click
  class={cx(
    padded ? 'px-4 py-2' : 'px-2 py-1',
    dark
      ? 'text-white bg-slate-950 hover:bg-slate-800 active:bg-slate-700'
      : 'text-white bg-transparent hover:bg-white/10 active:bg-blue-200/20',
    'rounded cursor-pointer font-medium tracking-wider select-none',
    'inline-flex flex-row items-center gap-2',
    outlined && 'border border-white justify-between',
    className,
    disabled && 'opacity-30 cursor-not-allowed pointer-events-none'
  )}
>
  <slot />
</button>
