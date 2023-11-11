<script lang="ts">
  import { onMount } from 'svelte';

  import CampaignHeader from './CampaignHeader.svelte';
  import Footer from '$components/Footer.svelte';
  import Breadcrumbs from '$components/Breadcrumbs.svelte';

  export let data;
  let { session, campaign } = data;
  $: ({ supabase, session } = data);
</script>

<div class="relative antialiased min-h-screen flex flex-col font-sans text-white">
  <!-- <div class="absolute opacity-20 inset-0 z-0 bg-[url('https://i.imgur.com/MHQQArZ.png')]" /> -->
  <div class="z-0">
    <CampaignHeader {campaign} {session} />
  </div>
  <main class="flex-1 border-0 p-4 md:p-4 mx-auto max-w-3xl w-full z-0">
    <Breadcrumbs />
    <slot />
    <Footer />
  </main>
</div>
