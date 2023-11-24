<script lang="ts">
  import { page } from '$app/stores';
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';

  export let data;
  $: ({ supabase, session } = data);

  $: afterLogin = $page.data.afterLogin ?? '/';

  async function signInWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/me?help=me`
      }
    });
  }

  $: hasSession = !!session?.access_token;
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4">
    <BackTo href={`/`} text="Campaigns" />
    <div
      class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900 text-center"
    >
      <Heading type="Page Heading">Login</Heading>
      {#if hasSession}
        <p>
          You are already logged in as <strong>{session.user.user_metadata?.full_name}</strong>.
        </p>
      {:else}
        <p>Sign in below by clicking the massive discord button.</p>
        <p>
          If you don't have a discord account, you can create one{' '}
          <a
            href="https://discord.com/register"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            here
          </a>
          .
        </p>
        <Button color="#5865F2" on:click={signInWithDiscord} class="hover:brightness-105 mx-auto">
          <img src="/images/discord_logo_white.png" alt="Discord Logo" class=" h-16 p-4 " />
        </Button>
      {/if}
    </div>
  </div>
</div>
