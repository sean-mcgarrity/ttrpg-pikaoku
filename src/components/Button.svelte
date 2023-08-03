<script lang="ts">
  import cx from 'classnames';
  let className = '';
  export { className as class };

  export let padded = false;
  export let type: 'button' | 'submit' = 'button';
</script>

<button
  {type}
  on:click
  class={cx(
    padded ? 'px-4 py-2' : 'px-2 py-1',
    'text-white hover:bg-white/10 rounded cursor-pointer font-medium tracking-wider select-none',
    'inline-flex flex-row items-center gap-2',
    className
  )}
>
  <slot />
</button>
