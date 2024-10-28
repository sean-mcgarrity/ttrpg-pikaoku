<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import AsLink from '$components/AsLink.svelte';
  import cx from 'classnames';
  

  type ButtonColors = 'green' | 'red' | 'slate';

  interface Props {
    class?: string;
    padded?: boolean;
    type?: 'button' | 'submit';
    outlined?: boolean;
    disabled?: boolean;
    title?: any;
    color?: ButtonColors;
    oldStyle?: boolean;
    href?: string | false;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    padded = false,
    type = 'button',
    outlined = false,
    disabled = false,
    title = null,
    color = null,
    oldStyle = true,
    href = false,
    children
  }: Props = $props();
</script>

{#if oldStyle}
  <button
    {type}
    onclick={bubble('click')}
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
    {@render children?.()}
  </button>
{:else}
  <AsLink {href}>
    <svelte:element
      this={href ? 'div' : 'button'}
      {type}
      onclick={bubble('click')}
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
      {@render children?.()}
    </svelte:element>
  </AsLink>
{/if}
