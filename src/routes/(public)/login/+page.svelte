<script lang="ts">
  import BackTo from '$components/buttons/BackTo.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import DiscordLoginButton from './DiscordLoginButton.svelte';
  import { session } from '$lib/utils/auth';
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4">
    <BackTo href={`/`} text="Campaigns" />
    <div
      class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900 text-center"
    >
      <Heading type="Page Heading">Login</Heading>
      {#if !!$session}
        <p>
          You are already logged in as <strong>{$session?.user.user_metadata?.full_name}</strong>.
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
        <DiscordLoginButton />
      {/if}
    </div>
  </div>
</div>
