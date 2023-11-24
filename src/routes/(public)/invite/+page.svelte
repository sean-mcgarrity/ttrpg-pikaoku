<script lang="ts">
  import { page } from '$app/stores';
  import YoureInvitedPrompt from './YoureInvitedPrompt.svelte';
  import ExpiredInvitePrompt from './ExpiredInvitePrompt.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { now } from 'svelte/internal';
  import { ArrowRight, Navigation } from 'lucide-svelte';

  $: hasExpired = $page.data.hasExpired;

  $: console.log('already joined', $page.data.alreadyJoined);
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4 shadow-kg p-4 ">
    <div
      class="px-4 md:px-16 py-8 rounded shadow text-white flex flex-col gap-2 min-w-md bg-slate-900 border-2 border-slate-950 text-center max-w-md"
    >
      {#if hasExpired}
        <ExpiredInvitePrompt />
      {:else if $page.data.alreadyJoined}
        <div class="text-7xl mb-4">&#128540;</div>
        <p class="text-2xl">You're already a member of this campaign!</p>
        <LinkButton href={`/campaigns/${$page.data.invite.campaign.id}`} class="text-2xl mt-8">
          Go there now <ArrowRight class="custom-icon" />
        </LinkButton>
      {:else}
        <YoureInvitedPrompt />
      {/if}
    </div>
  </div>
</div>
