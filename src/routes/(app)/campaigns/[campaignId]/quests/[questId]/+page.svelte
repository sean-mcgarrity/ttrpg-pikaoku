<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import {
    deleteQuestNoteMutation,
    getQuestQuery,
    updateQuestMutation
  } from '$lib/persistance/quests';
  import { getRelativeTime } from '$lib/utils/time';
  import SvelteMarkdown from 'svelte-markdown';
  import AddQuestNoteForm from '$components/quests/AddQuestNoteForm.svelte';
  import Avatar from '$components/Avatar.svelte';
  import Button from '$components/buttons/Button.svelte';
  import { PencilRuler, Star, Pin, ArrowLeft, X } from 'lucide-svelte';
  import { page } from '$app/stores';
  import QuestEditForm from '../QuestEditForm.svelte';
  import type { TablesUpdate } from '$types/database';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';

  let campaignId = $derived($page.params.campaignId);
  const query = getQuestQuery();
  let quest = $derived($query.data);

  let deleteComment = $derived(deleteQuestNoteMutation());
  let handleDeleteComment = $derived(async (id: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await $deleteComment.mutateAsync(id);
    }
  });

  const update = updateQuestMutation();

  let editting = $state(false);
  let handleEditSave = async (updatedFields: TablesUpdate<'quest'>) => {
    console.log('saving', updatedFields);
    $update.mutateAsync({
      ...updatedFields,
      id: quest.id
    });
    editting = false;
  };
</script>

<a href={`/campaigns/${campaignId}/quests`} class="text-white/60">
  <ArrowLeft /> Back to all quests
</a>

<div class="mt-2">
  {#if $query.isLoading}
    <LoadingInsert fullPage loading={true} />
    <div>Loading...</div>
  {:else if $query.isError}
    <div>Error:</div>
  {:else if $query.isSuccess && !!quest}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="col-span-2 flex flex-col gap-4">
        {#if editting}
          <QuestEditForm {quest} onSubmit={handleEditSave} />
        {:else}
          <Heading type="Page Heading" tight>{quest.name}</Heading>
          {#if quest.summary}
            <div class="">{quest.summary}</div>
          {:else}
            <div class="text-white/80 italic">No summary</div>
          {/if}
          {#if quest.description}
            <div class="py-[0.125rem]">{quest.description}</div>
          {:else}
            <div class="text-white/80 italic">No description</div>
          {/if}
        {/if}
        <div class="border rounded-full border-white/10"></div>
        <div class="flex flex-col gap-2 shadow">
          {#each quest.notes as note (note.id)}
            <div class="relative bg-white/5 rounded p-4 flex flex-col gap-3">
              <div class="flex flex-row flex-grow gap-2 items-center">
                <Avatar profile={note.author} size="small" />
                <div>{note.author?.username ?? 'Someone'}</div>
                <span class="text-white/60 font-light text-sm ml-auto mr-4"
                  >{getRelativeTime(note.created_at)}</span
                >
              </div>
              <SvelteMarkdown
                source={note.content.replaceAll('\n', '<br />')}
                options={{ break: true, gfm: true }}
              />
            </div>
          {:else}
            <div class="text-white/80 italic">No updates added yet</div>
          {/each}
        </div>
        {#if !editting}
          <AddQuestNoteForm questId={quest.id} />
        {/if}
      </div>
      <div class="bg-white/10 p-2 rounded mb-auto flex flex-col gap-3">
        {#if editting}
          <Button on:click={() => (editting = false)}><X /> Cancel edit</Button>
        {:else}
          <Button on:click={() => (editting = true)}><PencilRuler /> Edit</Button>
        {/if}
        <Button><Star /> Star quest</Button>
        <Button><Pin />Pin quest</Button>
      </div>
    </div>
  {/if}
</div>
