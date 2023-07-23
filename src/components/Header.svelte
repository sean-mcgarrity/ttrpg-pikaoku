<script lang="ts">
  import { page } from '$app/stores';
  import type { AuthSession } from '@supabase/supabase-js';
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  export let session: any;

  onMount(async () => {
    session = await supabase.auth.getSession();
    console.log('session', session);
  });

  console.log('session', session);
</script>

<nav
  class="flex items-center p-4 lg:px-6 bg-gray-700 border-b border-gray-900 shadow text-white justify-between"
>
  <div class="font-bold text-2xl uppercase">
    <a class="" href="/">Sean's Game</a>
  </div>
  <div>
    <a href="/login">Login</a>
  </div>
</nav>
