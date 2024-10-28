<script lang="ts">
  import cs from 'classnames';


  type sizes = 'sm' | 'md' | 'lg';

  interface Props {
    href: string;
    title: string;
    bgImgSrc: string;
    size?: sizes;
    class?: string;
  }

  let {
    href,
    title,
    bgImgSrc,
    size = 'lg',
    class: className = ''
  }: Props = $props();
  
</script>

<a {href} class={cs(className, 'hover:scale-105')}>
  <div
    class={cs(
      {
        'h-20': size === 'sm',
        'h-40': size === 'md',
        'h-60': size === 'lg'
      },
      `bg-cover bg-center saturate-0 hover:saturate-100 transition-all duration-500 group relative py-12 gap-8 border-4 border-black hover:border-white/80 shadow rounded`
    )}
    style={bgImgSrc && `background-image: url(${bgImgSrc});`}
  >
    <div
      class="transition-all duration-500 absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10"
></div>
    <h2
      class="transition-all duration-500 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 font-bold uppercase text-white tracking-wider"
    >
      {title}
    </h2>
  </div>
</a>
