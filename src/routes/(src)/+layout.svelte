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

<div class="antialiased bg-slate-950 min-h-screen flex flex-col font-sans">
  <Header {user} />
  <main class="flex-1 border-0 p-4 md:p-4 mx-auto max-w-6xl w-full">
    <Breadcrumbs />
    <slot />
  </main>
  <Footer />
</div>
