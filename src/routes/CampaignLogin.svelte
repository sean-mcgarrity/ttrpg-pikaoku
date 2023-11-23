<script lang="ts">
  import { page } from '$app/stores';

  export let campaign: any;

  $: title = campaign.name;
  $: bgImgSrc = campaign.banner_src;

  $: session = $page.data.session;
  $: hasSession = !!session?.access_token;
  $: href = hasSession ? `/campaign/${campaign.id}` : `/login?afterLogin=/campaign/${campaign.id}`;
</script>

<a
  {href}
  class={`w-full grayscale  hover:filter-none bg-cover transition-all duration-150 group relative h-48 py-12 gap-8 border-4 border-black hover:border-white/80 shadow bg-center`}
  style={bgImgSrc && `background-image: url(${bgImgSrc});`}
>
  <div
    class="transition-all duration-150 absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10"
  />
  <div
    class="transition-all duration-150 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 text-white text-left"
  >
    <h2 class="font-bold uppercase tracking-wider">{title}</h2>
  </div>
</a>
