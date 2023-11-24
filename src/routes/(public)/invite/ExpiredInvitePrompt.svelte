<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import { isBrowser } from '@supabase/ssr';
  import { ArrowRight, LogIn } from 'lucide-svelte';
  import DiscordLoginButton from '../login/DiscordLoginButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LinkButton from '$components/LinkButton.svelte';

  $: ({ session } = $page.data);

  $: search = isBrowser() ? window?.location?.search : '';

  $: hasSession = !!session?.access_token;
</script>

<div class="text-7xl mb-4">&#128556;</div>
<Heading type="Subsection Heading">Uh oh!</Heading>
<Heading type="Page Heading">Invite expired</Heading>
<p class="mb-4">
  This invite link is no longer valid. If that doesn't sound right, send Sean a message.
</p>
{#if hasSession}
  <LinkButton href="/me">
    Go to your profile <ArrowRight class="custom-icon" />
  </LinkButton>
{:else}
  <LinkButton href="/">
    Back to safety <ArrowRight class="custom-icon" />
  </LinkButton>
{/if}
