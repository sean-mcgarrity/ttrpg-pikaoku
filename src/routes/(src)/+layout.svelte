<script>
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let user = null;

  import { onMount } from 'svelte';
  import Breadcrumbs from '$src/components/Breadcrumbs.svelte';
  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  });
</script>

<div
  class="antialiased bg-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col font-sans"
>
  <Header {user} />
  <main class="flex-1 border-0 p-4 sm:p-0 mx-auto max-w-6xl w-full">
    <Breadcrumbs />
    <slot />
  </main>
  <Footer />
</div>
