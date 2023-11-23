<script lang="ts">
  import '../app.css';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import Footer from '$components/Footer.svelte';

  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(async () => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  const queryClient = new QueryClient();
</script>

<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
  </style>
</svelte:head>
<div class="relative w-full flex-col bg-slate-950 text-white shadow-inner h-full">
  <div class="absolute opacity-5 inset-0 z-0 bg-[url('https://i.imgur.com/cgGOKak.webp')]" />
  <div
    class="relative min-h-screen max-w-6xl mx-auto border-x-4 border-black/50 shadow-lg bg-slate-950"
  >
    <QueryClientProvider client={queryClient}>
      <slot />
      <Footer />
    </QueryClientProvider>
  </div>
</div>
