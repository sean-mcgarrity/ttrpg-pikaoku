<script lang="ts">
  import { onMount } from 'svelte';

  import CampaignHeader from './CampaignHeader.svelte';
  import Footer from '$components/Footer.svelte';
  import Breadcrumbs from '$components/Breadcrumbs.svelte';

  export let data;
  let { session, campaign } = data;
  $: ({ supabase, session } = data);
</script>

<div
  class="antialiased bg-blue-500/10 min-h-screen flex flex-col font-sans text-white"
>
  <CampaignHeader {campaign} {session} />
  <main class="flex-1 border-0 p-4 md:p-4 mx-auto max-w-6xl w-full">
    <Breadcrumbs />
    <slot />
  </main>
  <Footer />
</div>
