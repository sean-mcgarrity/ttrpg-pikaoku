<script lang="ts">
  import '../app.css';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

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

<div class="w-full flex-col bg-slate-950 text-white shadow-inner h-full">
  <div class="max-w-6xl mx-auto border-x-4 border-black/50 shadow-lg">
    <QueryClientProvider client={queryClient}>
      <slot />
    </QueryClientProvider>
  </div>
</div>
