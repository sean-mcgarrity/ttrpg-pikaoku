<script lang="ts">
  import { onMount } from 'svelte';

  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import Breadcrumbs from '$src/components/Breadcrumbs.svelte';

  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  let user = null;

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
