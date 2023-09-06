<script lang="ts">
  import cx from 'classnames';
  let className = '';
  export { className as class };

  export let padded = false;
  export let type: 'button' | 'submit' = 'button';
  export let outlined = false;
</script>

<button
  {type}
  on:click
  class={cx(
    padded ? 'px-4 py-2' : 'px-2 py-1',
    'bg-transparent text-white hover:bg-white/20 rounded cursor-pointer font-medium tracking-wider select-none',
    'inline-flex flex-row items-center gap-2',
    outlined && 'border border-white justify-between',
    className
  )}
>
  <slot />
</button>
