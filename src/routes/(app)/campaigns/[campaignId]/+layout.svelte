<script lang="ts">
  import CampaignHeader from './CampaignHeader.svelte';

  export let data;
  let { session, campaign } = data;
  $: ({ supabase, session } = data);
</script>

<div class="relative antialiased min-h-screen flex flex-col font-sans text-white">
  <!-- <div class="absolute opacity-20 inset-0 z-0 bg-[url('https://i.imgur.com/MHQQArZ.png')]" /> -->
  <div class="z-0">
    <CampaignHeader {campaign} />
  </div>
  <main class="flex-1 border-0 p-4 md:p-4 mx-auto max-w-3xl w-full z-0">
    <slot />
    
  </main>
</div>
