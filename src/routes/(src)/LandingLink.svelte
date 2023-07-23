<script lang="ts">
  export let href: string;
  export let title: string;
  export let description: string;
  export let bgImgSrc: string;
</script>


<a {href}>
  <div class={`transition-all duration-150 group relative h-40 py-12 gap-8 border-4 border-black hover:border-white shadow ${bgImgSrc}`}>
    <div class="transition-all duration-150 absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10" />
    <h2 class="transition-all duration-150 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 font-bold uppercase text-white">{title}</h2>
  </div>
</a>
