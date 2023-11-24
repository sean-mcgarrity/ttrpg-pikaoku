<script lang="ts">
  import { page } from '$app/stores';
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { LogIn } from 'lucide-svelte';
  import DiscordLoginButton from '../login/DiscordLoginButton.svelte';
  import { isBrowser } from '@supabase/ssr';
  import { createQuery } from '@tanstack/svelte-query';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data;
  $: ({ supabase, session } = data);

  $: token = $page.data.inviteToken ?? '';
  $: console.log('invite', $page.data.invite);

  $: afterLogin = $page.data.afterLogin ?? '/';

  $: search = isBrowser() ? window?.location?.search : '';

  $: console.log('token', $page.data.inviteToken);

  $: hasSession = !!session?.access_token;
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4 shadow-kg ">
    <div
      class="px-16 py-8 rounded shadow text-white flex flex-col gap-2 min-w-md bg-slate-900 text-center max-w-md"
    >
      <div class="text-7xl mb-4">&#127881;</div>
      <Heading type="Page Heading">You're invited!</Heading>
      {#if hasSession}
        <p>Click join below to join the campaign. Recieved this by mistake? Then piss off!</p>
        <Button class="mx-auto text-2xl mt-8">
          Join <LogIn class="custom-icon" />
        </Button>
      {:else}
        <p class="mb-8">
          Before you can join the campaign, please sign in with discord below. If you don't have a
          Discord account, you can create one{' '}
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
        <DiscordLoginButton redirectTarget={`invite${search}}`} />
      {/if}
    </div>
  </div>
</div>
