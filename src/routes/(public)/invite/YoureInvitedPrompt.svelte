<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/buttons/Button.svelte';
  import { isBrowser } from '@supabase/ssr';
  import { LogIn } from 'lucide-svelte';
  import DiscordLoginButton from '../login/DiscordLoginButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { createMutation } from '@tanstack/svelte-query';
  import { goto } from '$app/navigation';

  $: ({ session } = $page.data);

  $: search = isBrowser() ? window?.location?.search : '';

  $: hasSession = !!session?.access_token;

  $: joinMutation = createMutation({
    mutationKey: ['join-campaign'],
    mutationFn: async () => {
      return await fetch('/invite' + search, {
        method: 'POST'
      });
    }
  });

  $: handleJoin = () => {
    $joinMutation.mutateAsync(null, {
      onSuccess: () => {
        goto('/campaigns/' + $page.data.invite.campaign.id);
      }
    });
  };
</script>

<div class="text-7xl mb-4">&#127881;</div>
<Heading type="Page Heading">You're invited!</Heading>
<div class="relative">
  <img src={$page?.data.invite.campaign.banner_src} class="w-full rounded-lg mb-4 " alt="" />
  <h2
    class="absolute transform -translate-x-1/2 -translate-y-2/3 top-2/3 left-1/2 whitespace-nowrap text-xl font-medium uppercase font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-black/40 pt-1 px-1 rounded"
  >
    {$page?.data.invite.campaign.name}
  </h2>
</div>
{#if hasSession}
  <p>
    Hey {session.user.user_metadata?.full_name}, click join below and you're good to go.
  </p>
  <Button class="mx-auto text-2xl mt-8" on:click={handleJoin} disabled={$joinMutation.isLoading}>
    Join <LogIn class="custom-icon" />
  </Button>
{:else}
  <p class="mb-4 px-4">Before you can join, please sign in below with discord.</p>
  <DiscordLoginButton redirectTarget={`/invite${search}`} />
  <p class=" text-offwhite/70 mt-2">
    No account? Register {' '}
    <a
      href="https://discord.com/register"
      target="_blank"
      rel="noopener noreferrer"
      class="underline"
    >
      here.
    </a>
  </p>
{/if}
