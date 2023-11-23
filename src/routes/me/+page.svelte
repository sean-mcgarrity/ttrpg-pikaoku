<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { createMutation } from '@tanstack/svelte-query';
  import { LogOut } from 'lucide-svelte';

  $: ({ supabase, session } = $page.data);

  $: signoutMutation = createMutation({
    mutationKey: ['signout'],
    mutationFn: async () => {
      return supabase.auth.signOut({ scope: 'local' });
    },
    onSuccess: () => {
      goto('/login');
    }
  });

  $: hasSession = !!session?.access_token;
</script>

<div class="min-h-screen bg-slate-950 w-full flex flex-col">
  <div class="mx-auto my-auto flex flex-col gap-4">
    <LoadingInsert loading={$signoutMutation.isLoading} />
    <BackTo href={`/`} text="Campaigns" />
    <div
      class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900 text-center"
    >
      {#if hasSession}
        <p>
          Hello <strong>{session.user.user_metadata?.full_name}</strong>.
        </p>
        <Button on:click={() => $signoutMutation.mutate()} class="justify-between mx-auto">
          <span>Sign out</span>
          <LogOut class="l-icon" />
        </Button>
      {/if}
    </div>
  </div>
</div>
