<script lang="ts">
  import '../app.css';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  console.log('session', session);

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
<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
