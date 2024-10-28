<script lang="ts">
  import { run } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import BackTo from '$components/buttons/BackTo.svelte';
  import Button from '$components/buttons/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { updateUserProfile } from '$lib/persistance/users';
  import { session, supabase, user } from '$lib/utils/auth';
  import { createMutation } from '@tanstack/svelte-query';
  import { HardDriveDownload, LogOut } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  let signoutMutation = $derived(createMutation({
    mutationKey: ['signout'],
    mutationFn: async () => {
      return $supabase.auth.signOut({ scope: 'local' });
    },
    onSuccess: () => {
      goto('/login');
    }
  }));

  let hasSession = $derived(!!$session?.access_token);

  run(() => {
    console.log('has session', $user);
  });

  let mutation = updateUserProfile();

  let userName = $state(''); //$userProfile?.username;
  let avatarSrc = ''; //$userProfile?.avatar_src;

  let handleUpdate = $derived(async () =>
    $mutation.mutate({ username: userName, avatar_src: avatarSrc, id: $user.id }));
</script>

{#if hasSession}
  <div class="min-h-screen bg-slate-950 w-full flex flex-col">
    <div class="mx-auto my-auto flex flex-col gap-4">
      <LoadingInsert loading={$signoutMutation.isLoading} />
      <BackTo href={`/`} text="Campaigns" />
      <div
        class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900 text-center"
      >
        <Heading type="Page Heading">{user}</Heading>
        <p>Hey you. Feeling like a change?</p>
        <TextField label="Username" bind:value={userName} />
        <!-- <TextField label="Avatar URL" bind:value={avatarSrc} /> -->
        <Button on:click={handleUpdate} class="justify-between mx-auto">
          <span>Save Changes</span>
          <HardDriveDownload class="l-icon" />
        </Button>
        {#if $signoutMutation.isSuccess}
          <p class="text-green-500" transition:fade>Changes saved!</p>
        {/if}
      </div>
      <Button on:click={() => $signoutMutation.mutate()} class="justify-between mx-auto">
        <span>Sign out</span>
        <LogOut class="l-icon" />
      </Button>
    </div>
  </div>
{/if}
