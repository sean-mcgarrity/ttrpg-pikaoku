<script lang="ts">
  import Button from '$src/components/Button.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowDown, LogIn, LogOut } from 'lucide-svelte';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  import { onMount } from 'svelte';

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: '/monster-parts'
      }
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  const query = createQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await supabase.auth.getUser();
      if (response.error) {
        throw response.error;
      } else {
        return response.data.user;
      }
    }
  });

</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4">
    <div class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900">
      <h1 class="text-4xl font-semibold">Sean's Login</h1>
      <Button outlined on:click={signInWithDiscord}>
        <span>Sign in with Discord</span>
        <LogIn class="l-icon" />
      </Button>
      <Button outlined on:click={signOut} class="justify-between">
        <span>Sign out</span>
        <LogOut class="l-icon" />
      </Button>
      <LinkButton href="/" class="text-black w-full">
        <ArrowDown class="l-icon rotate-90" /> Back to campaigns
      </LinkButton>
    </div>
    {#if $query.data}
      <div class="text-white/80 mx-auto">User: {$query.data.email}</div>
    {/if}
  </div>
</div>
