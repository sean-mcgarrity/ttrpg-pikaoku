<script>
  import cx from 'classnames';

  export let to = '/';
  export let title = '';
  export let description = '';
  export let Icon;
  // export class
  let className = '';
  export { className as class };
</script>

<a
  href={to}
  class={cx(
    'rounded-lg bg-white/10 py-6 text-center flex flex-col shadow hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer items-center w-full sm:w-auto',
    className
  )}
>
  {#if Icon}
    <div class="rounded-full bg-black/20 p-4 mb-3">
      <Icon class="custom-icon h-12 w-12" />
    </div>
  {/if}
  {#if title}
    <div class="text-lg font-medium ">{title}</div>
  {/if}
  {#if description}
    <div class="text-sm font-light hidden md:block">{description}</div>
  {/if}
</a>
