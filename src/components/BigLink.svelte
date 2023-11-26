<script lang="ts">
  import cs from 'classnames';

  export let href: string;
  export let title: string;
  export let bgImgSrc: string;

  type sizes = 'sm' | 'md' | 'lg';
  export let size: sizes = 'lg';

  let className = '';
  export { className as class };
</script>

<a {href} class={cs(className, 'hover:scale-105')}>
  <div
    class={cs(
      {
        'h-20': size === 'sm',
        'h-40': size === 'md',
        'h-60': size === 'lg'
      },
      `bg-cover bg-center saturate-0 hover:saturate-100 transition-all duration-500 group relative py-12 gap-8 border-4 border-black hover:border-white/80 shadow`
    )}
    style={bgImgSrc && `background-image: url(${bgImgSrc});`}
  >
    <div
      class="transition-all duration-500 absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10"
    />
    <h2
      class="transition-all duration-500 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 font-bold uppercase text-white tracking-wider"
    >
      {title}
    </h2>
  </div>
</a>
