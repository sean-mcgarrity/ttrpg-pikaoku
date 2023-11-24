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
  import YoureInvitedPrompt from './YoureInvitedPrompt.svelte';
  import ExpiredInvitePrompt from './ExpiredInvitePrompt.svelte';

  export let data;
  $: ({ session } = data);

  $: hasExpired = $page.data.hasExpired;
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4 shadow-kg p-4 ">
    <div
      class="px-4 md:px-16 py-8 rounded shadow text-white flex flex-col gap-2 min-w-md bg-slate-900 border-2 border-slate-950 text-center max-w-md"
    >
      {#if hasExpired}
        <ExpiredInvitePrompt />
      {:else}
        <YoureInvitedPrompt />
      {/if}
    </div>
  </div>
</div>
