<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import BackTo from '$components/BackTo.svelte';
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { extractData } from '$lib/utils/requests';
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { HardDriveDownload, LogOut } from 'lucide-svelte';
  import type { UpdateDto } from 'src/app';
  import { get } from 'svelte/store';
  import { fade } from 'svelte/transition';

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
  $: user = session?.user;

  let profileQ = createQuery({
    queryKey: ['me', 'profile'],
    queryFn: async () => {
      return extractData(await supabase.from('profile').select('*').eq('id', user.id).single());
    },
    initialData: get(page).data.profile
  });

  let userName = $profileQ.data?.username;
  let avatarSrc = $profileQ.data?.avatar_src;

  $: updateProfileM = createMutation<unknown, unknown, UpdateDto<'profile'>>({
    mutationKey: ['me', 'updateProfile'],
    mutationFn: async (data) => {
      return extractData(await supabase.from('profile').update(data).eq('id', user.id));
    },
    onSuccess: async () => {
      const res = await $profileQ.refetch();
      userName = res.data.username;
      avatarSrc = res.data.avatar_src;
      success = true;
    }
  });

  $: handleUpdate = async () => {
    await $updateProfileM.mutate({ username: userName, avatar_src: avatarSrc });
  };

  let success = false;
  $: hasUpdated = !$updateProfileM.isLoading && success;
</script>

{#if hasSession}
  <div class="min-h-screen bg-slate-950 w-full flex flex-col">
    <div class="mx-auto my-auto flex flex-col gap-4">
      <LoadingInsert loading={$signoutMutation.isLoading || $profileQ.isLoading} />
      <BackTo href={`/`} text="Campaigns" />
      <div
        class="px-16 py-8 rounded shadow text-white flex flex-col gap-4 min-w-md bg-slate-900 text-center"
      >
        <Heading type="Page Heading">{user.user_metadata.full_name}</Heading>
        <p>Hey you. Feeling like a change?</p>
        <TextField label="Username" bind:value={userName} />
        <TextField label="Avatar URL" bind:value={avatarSrc} />
        <Button on:click={handleUpdate} class="justify-between mx-auto">
          <span>Save Changes</span>
          <HardDriveDownload class="l-icon" />
        </Button>
        {#if hasUpdated}
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
