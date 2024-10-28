<script lang="ts">
  import { session } from '$lib/utils/auth';

  interface Props {
    campaign: any;
  }

  let { campaign }: Props = $props();

  let title = $derived(campaign.name);
  let bgImgSrc = $derived(campaign.banner_src);

  let href = $derived($session?.access_token
    ? `/campaigns/${campaign.id}`
    : `/login?afterLogin=/campaigns/${campaign.id}`);
</script>

<a
  {href}
  class={`w-full grayscale hover:scale-105 hover:filter-none bg-cover transition-all duration-300 group relative h-48 py-12 gap-8 border-4 border-black hover:border-white/80 shadow bg-center`}
  style={bgImgSrc && `background-image: url(${bgImgSrc});`}
>
  <div
    class="transition-all duration-300 absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10"
></div>
  <div
    class="transition-all duration-300 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 text-white text-left"
  >
    <h2 class="font-bold uppercase tracking-wider">{title}</h2>
  </div>
</a>
