<script lang="ts">
  import cx from 'classnames';
  let className = '';
  export { className as class };

  export let padded = false;
  export let type: 'button' | 'submit' = 'button';
  export let outlined = false;
  export let disabled = false;
  export let title = null;
  export let color: string = null;
</script>

<button
  {type}
  on:click
  style={color && `background-color: ${color}`}
  class={cx(
    'hover:scale-105',
    padded ? 'px-4 py-2' : 'px-2 py-1',
    color
      ? 'hover:brightness-110 active:brightness-90'
      : 'bg-transparent hover:bg-white/10 active:bg-blue-200/20',
    'text-white',
    'rounded cursor-pointer font-medium tracking-wider select-none',
    'inline-flex flex-row items-center gap-2',
    outlined && 'border border-white justify-between',
    className,
    disabled && 'opacity-30 cursor-not-allowed pointer-events-none'
  )}
  {title}
>
  <slot />
</button>
