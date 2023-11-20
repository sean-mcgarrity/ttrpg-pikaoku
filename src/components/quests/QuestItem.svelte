<script lang="ts">
  import cs from 'classnames';
  import Button from '$components/Button.svelte';
  import { CheckCircle, ChevronDown, Pencil, Pin, Save, SaveIcon, Trash } from 'lucide-svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { Quest } from 'src/app';
  import { slide, fly } from 'svelte/transition';
  import AddQuestNoteForm from './AddQuestNoteForm.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import {
    deleteQuestMutation,
    deleteQuestNoteMutation,
    updateQuestMutation
  } from '$lib/persistance/quests';
  import { useQueryClient } from '@tanstack/svelte-query';

  const queryClient = useQueryClient();

  export let quest: Quest;
  export let preview = false;

  $: isFinished = quest.finished === true;

  let expanded = false;
  let editing = false;

  $: handleEditToggle = (newValue: boolean = null) => {
    editing = newValue ?? !editing;
    if (editing === true) {
      expanded = true;
    }
  };

  $: handleExpandToggle = () => {
    expanded = !expanded;
    if (expanded === false) {
      editing = false;
    }
  };

  let update = updateQuestMutation();
  let del = deleteQuestMutation();

  $: pinQuest = async () => {
    await $update.mutateAsync({ id: quest.id, pinned: !quest.pinned });
  };

  $: updateQuestDetails = async () => {
    await $update.mutateAsync({ id: quest.id, name: quest.name, description: quest.description });
    console.log('after updated quest');
    editing = false;
  };

  $: deleteQuest = async () => {
    await $del.mutateAsync(quest.id);
  };

  $: deleteComment = deleteQuestNoteMutation();
  $: handleDeleteComment = async (id: number) => {
    await $deleteComment.mutateAsync(id);
  };

  $: loading = $update.isLoading && $del.isLoading;
</script>

<div class="bg-blue-900 rounded overflow-hidden relative">
  {#if loading}
    <LoadingInsert />
  {/if}
  <div class="bg-blue-950 px-4 py-2 flex flex-row justify-between">
    <div class="items-center flex flex-row font-medium gap-1">
      <Button on:click={pinQuest} title="Pin quest" disabled={loading}>
        <Pin
          class={cs(
            'transition-transform duration-300',
            quest.pinned ? 'rotate-0' : '-rotate-45',
            quest.pinned ? 'text-white fill-white' : 'text-white/50'
          )}
        />
      </Button>
      <Button on:click={handleExpandToggle} title="Expand quest details">
        <ChevronDown
          class={cs('transition-transform duration-300', expanded ? 'rotate-0' : '-rotate-90')}
        />
      </Button>
      {#if editing}
        <TextField bind:value={quest.name} />
      {:else}
        <div class="h-full py-[0.125rem]">
          {quest.name}
        </div>
      {/if}
    </div>
    {#if !preview || (preview && expanded)}
      <div class="grid grid-cols-3 gap-2 items-center">
        {#if editing}
          <Button on:click={updateQuestDetails} title="Save changes">
            <SaveIcon class="text-green-400" />
          </Button>
        {:else}
          <Button on:click={() => handleEditToggle(true)} title="Edit quest details">
            <Pencil class="text-cyan-400" />
          </Button>
        {/if}
        <Button
          title="Delete quest"
          on:click={async () => {
            if (confirm('Are you sure you want to delete this quest?')) {
              await deleteQuest();
            }
          }}
        >
          <Trash class="text-red-500" />
        </Button>
        <Button title="Mark quest as finished">
          <CheckCircle class="text-green-700" />
        </Button>
      </div>
    {/if}
  </div>

  {#if expanded}
    <div class="px-8 pt-2 pb-4 flex flex-col gap-2" transition:slide|local>
      <div>
        {#if editing}
          <TextField bind:value={quest.description} placeholder="Quest description" />
        {:else}
          <div class="py-[0.125rem]">
            {quest.description}
          </div>
        {/if}
      </div>
      <div class=" text-white/80 flex flex-col gap-2">
        {#each quest.notes as note (note.id)}
          <div
            class="bg-offwhite/95 text-offblack rounded-t-xl rounded-br-2xl p-2 flex flex-row"
            transition:fly|local
          >
            {note.content}
            {#if editing}
              <Button
                class="ml-auto"
                on:click={async () => {
                  if (confirm('Are you sure you want to delete this comment?')) {
                    await handleDeleteComment(note.id);
                  }
                }}
                title="Delete comment"
              >
                <Trash class="text-red-500" />
              </Button>
            {/if}
          </div>
        {:else}
          <div class="text-white/80 italic">No updates added yet</div>
        {/each}
      </div>
      <div>
        <AddQuestNoteForm questId={quest.id} />
      </div>
    </div>
  {/if}
</div>
