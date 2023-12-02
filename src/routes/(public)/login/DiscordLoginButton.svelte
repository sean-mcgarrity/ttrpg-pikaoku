<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/buttons/Button.svelte';
  import { isBrowser } from '@supabase/ssr';

  export let redirectTarget = '';

  $: ({ supabase, session } = $page.data);

  $: origin = isBrowser() ? window?.location.origin : '';

  async function signInWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${origin}${redirectTarget}`
      }
    });
  }

  $: hasSession = !!session?.access_token;
</script>

{#if hasSession}
  <div>You're already logged in, you shouldn't see this.</div>
{:else}
  <Button color="#5865F2" on:click={signInWithDiscord} class="hover:brightness-105 mx-auto">
    <img src="/images/discord_logo_white.png" alt="Discord Logo" class=" h-16 p-4 " />
  </Button>
{/if}
