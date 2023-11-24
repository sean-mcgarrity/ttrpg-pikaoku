<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { extractData, getSupabase } from '$lib/utils/requests';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { MailPlus, Clipboard, Trash } from 'lucide-svelte';
  import NewInviteForm from './NewInviteForm.svelte';
  import { slide } from 'svelte/transition';

  $: campaign = $page.data.campaign;

  $: getInvitesQuery = createQuery(
    ['campaign-invites', campaign?.id],
    async () => {
      const sup = getSupabase();
      return extractData(
        await sup
          .from('campaign_invite')
          .select('*, times_used:campaign_members(count)')
          .eq('campaign_id', campaign.id)
      );
    },
    {
      enabled: !!campaign?.id
    }
  );

  $: invites = $getInvitesQuery.data ?? [];

  $: expanded = false;

  let queryClient = useQueryClient();

  let copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
  };

  let forceExpireMutation = createMutation({
    mutationKey: ['force-expire'],
    mutationFn: async (id: string) => {
      const sup = getSupabase();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await sup.from('campaign_invite').update({ expires: yesterday.toISOString() }).eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaign-invites']);
    }
  });

  $: handleForceExpire = (id: string) => {
    if (confirm('Are you sure you want to expire this invite?')) {
      $forceExpireMutation.mutate(id);
    }
  };
</script>

<div class="flex flex-col gap-2">
  <Heading type="Subsection Heading">Invite Links</Heading>
  {#each invites as invite (invite.id)}
    {@const expiresString = new Date(invite.expires).toISOString().split('T')[0]}
    {@const remainingUses = invite.max_uses - invite.times_used[0]['count']}
    {@const expired = new Date(invite.expires) < new Date() || remainingUses <= 0}
    <div
      class="flex flex-col gap-4 p-8 bg-white/5 rounded relative overflow-hidden"
      transition:slide
    >
      <Button
        class="absolute top-0 right-0 m-2 text-red-600"
        on:click={() => handleForceExpire(invite.id)}
      >
        <Trash />
      </Button>
      {#if expired}
        <div class="absolute flex inset-0  bg-zinc-950/90">
          <div class="m-auto text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">Expired</div>
        </div>
      {/if}
      <div class="grid grid-cols-4 gap-2 justify-between">
        <div class="col-span-2 flex flex-col gap-2">
          <div class="text-lg font-bold">Invite Link</div>
          <div class="flex flex-rows">
            <div class="flex rounded-l bg-slate-600  px-2">
              <Clipboard class="custom-icon m-auto" />
            </div>
            <input
              class="bg-slate-800 border-2 border-slate-600 p-2 rounded-r shadow-inner text-ellipsis cursor-pointer w-full "
              readonly
              type="text"
              value="{window.location.origin}/invite?token={invite.id}"
              on:click={copyToClipboard}
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-lg font-bold">Uses left</div>
          <div class="grid grid-cols-5 gap-2">
            <input
              class="bg-slate-800 border-2 border-slate-600 p-2 rounded shadow-inner col-span-2"
              readonly
              type="text"
              value={remainingUses}
              on:click={copyToClipboard}
            />
            <div class=" my-auto text-center">of</div>
            <input
              class="bg-slate-800 border-2 border-slate-600 p-2 rounded shadow-inner col-span-2"
              readonly
              type="text"
              value={invite.max_uses}
              on:click={copyToClipboard}
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-lg font-bold">Expires</div>
          <input
            class="bg-slate-800 border-2 border-slate-600 p-2 rounded shadow-inner text-ellipsis cursor-pointer "
            readonly
            type="date"
            value={expiresString}
            on:click={copyToClipboard}
          />
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col gap-4 p-8 bg-white/5 rounded">No invite links yet</div>{/each}

  {#if !expanded}
    <Button on:click={() => (expanded = true)} class="">New invite <MailPlus /></Button>
  {:else}
    <NewInviteForm />
  {/if}
</div>
