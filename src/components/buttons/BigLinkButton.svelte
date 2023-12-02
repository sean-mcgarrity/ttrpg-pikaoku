<script lang="ts">
  import cx from 'classnames';
  export let colorClasses = 'bg-white/80 hover:bg-white/90 active:bg-white/60 text-slate-800';
  export let href: string = '';
  export let newPage: boolean = true;
</script>

<a
  {href}
  target={newPage ? '_blank' : '_self'}
  rel={newPage ? 'noopener noreferrer' : ''}
  class={cx(
    'px-4 py-2 rounded shadow hover:scale-105 transition-all duration-150',
    'w-full flex flex-row items-center gap-2',
    'text-left text-2xl font-medium tracking-wider select-none leading-snug',
    'hover:brightness-110 active:brightness-90',
    colorClasses,
    'cursor-pointer'
  )}
>
  <slot />
</a>
