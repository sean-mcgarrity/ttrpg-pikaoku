<script>
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let user = null;

  import { onMount } from 'svelte';
  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  });
</script>

<div
  class="bg-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col font-sans"
>
  <Header {user} />
  <main class="flex-1 border-0 p-2 sm:p-8 mx-auto max-w-6xl w-full">
    <slot />
  </main>
  <Footer />
</div>
