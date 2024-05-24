<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { supabase } from '$lib/utils/supabaseClient';
  import { isBrowser } from '@supabase/ssr';
  import { session } from '$lib/utils/auth';

  $: origin = isBrowser() ? window?.location.origin : '';

  async function signInWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${origin}/me`
      }
    });
  }
</script>

{#if $session}
  <div>You're already logged in, you shouldn't see this.</div>
{:else}
  <Button color="#5865F2" on:click={signInWithDiscord} class="hover:brightness-105 mx-auto">
    <img src="/images/discord_logo_white.png" alt="Discord Logo" class=" h-16 p-4 " />
  </Button>
{/if}
