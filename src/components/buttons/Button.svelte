<script lang="ts">
  import AsLink from '$components/AsLink.svelte';
  import cx from 'classnames';
  let className = '';
  export { className as class };

  type ButtonColors = 'green' | 'red' | 'slate';

  export let padded = false;
  export let type: 'button' | 'submit' = 'button';
  export let outlined = false;
  export let disabled = false;
  export let title = null;
  export let color: ButtonColors = null;
  export let oldStyle = true;
  export let href: string | false = false;
</script>

{#if oldStyle}
  <button
    {type}
    on:click
    style={color && `background-color: ${color}`}
    class={cx(
      'hover:scale-105',
      padded ? 'px-4 py-2' : 'px-2 py-1',
      !!color
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
{:else}
  <AsLink {href}>
    <svelte:element
      this={href ? 'div' : 'button'}
      {type}
      on:click
      aria-label="Create new quest"
      role="button"
      tabindex="0"
      {disabled}
      class={cx(
        'hover:scale-105',
        padded ? 'px-4 py-2' : 'px-2 py-1',
        'hover:brightness-110 active:brightness-90',
        'rounded cursor-pointer font-medium tracking-wider select-none',
        'inline-flex flex-row items-center gap-2',
        {
          'bg-green-600/50': color === 'green',
          'bg-red-600/50': color === 'red',
          'bg-slate-600/50': color === 'slate'
        },
        outlined && 'border border-white justify-between',
        className,
        disabled && 'opacity-30 cursor-not-allowed pointer-events-none'
      )}
      {title}
    >
      <slot />
    </svelte:element>
  </AsLink>
{/if}
