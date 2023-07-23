<script lang="ts">
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

  let user;

  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  });

  console.log('user', user);
</script>

<div
  class="my-4 border border-white border-solid px-4 py-2 rounded text-black bg-white bg-opacity-80"
>
  <button on:click={signInWithDiscord}>Sign in with Discord</button>
</div>
<div
  class="my-4 border border-white border-solid px-4 py-2 rounded text-black bg-white bg-opacity-80"
>
  <button on:click={signOut}>Sign out</button>
</div>

{#if user}
  <div
    class="my-4 border border-white border-solid px-4 py-2 rounded text-black bg-white bg-opacity-80"
  >
    <div class="text-xl">User: {user.email}</div>
  </div>
{/if}
