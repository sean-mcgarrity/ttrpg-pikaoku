<script lang="ts">
  import cs from 'classnames';
  import Button from '$components/buttons/Button.svelte';
  import { CheckCircle, ChevronDown, FileEdit, Pin, SaveIcon, Star, Trash } from 'lucide-svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { Quest } from 'src/app';
  import { fade, slide } from 'svelte/transition';
  import AddQuestNoteForm from './AddQuestNoteForm.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { deleteQuestMutation, updateQuestMutation } from '$lib/persistance/quests';
  import QuestNote from './QuestNote.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import ConfirmationModal from '$components/Modals/ConfirmationModal.svelte';

  export let quest: Quest;
  export let preview = false;

  let expanded = false;
  let editing = false;
  let newGroup = '';

  $: handleEditToggle = (newValue: boolean = null) => {
    editing = newValue ?? !editing;
    if (editing === true) {
      newGroup = quest.group;
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

  $: updateQuestStatus = async (newStatus: Quest['status']) => {
    await $update.mutateAsync({ id: quest.id, status: newStatus });
  };

  $: updateQuestDetails = async () => {
    await $update.mutateAsync({
      id: quest.id,
      name: quest.name,
      description: quest.description,
      group: newGroup
    });
    editing = false;
  };

  $: loading = $update.isLoading && $del.isLoading;

  $: finished = quest.status === 'finished';
  $: pinned = quest.status === 'pinned';
  $: starred = quest.status === 'starred';
  $: editable = !finished && quest.status !== 'deleted';
  $: deleted = quest.status === 'deleted';
</script>

<div
  class={cs(
    deleted ? 'bg-red-900' : starred ? 'bg-purple-800' : finished ? 'bg-green-900' : 'bg-blue-900',
    `rounded overflow-hidden relative`
  )}
>
  {#if loading}
    <LoadingInsert />
  {/if}
  <div
    class={cs(
      deleted
        ? 'bg-red-950'
        : starred
        ? 'bg-purple-900'
        : finished
        ? 'bg-green-950'
        : 'bg-blue-950',
      ' px-4 py-2 flex flex-row justify-between'
    )}
  >
    <div class="items-center flex flex-row font-medium gap-2">
      {#if editable}
        <Button
          on:click={() => updateQuestStatus(pinned || starred ? 'none' : 'pinned')}
          title="Pin quest"
          disabled={loading}
        >
          <Pin
            class={cs(
              'transition-transform duration-300',
              pinned || starred ? 'rotate-0' : '-rotate-45',
              pinned || starred ? 'text-white fill-white' : 'text-white/50'
            )}
          />
        </Button>
      {:else}
        <div />
      {/if}
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
      <div class="grid grid-cols-4 gap-2 items-center" transition:fade>
        {#if editable}
          {#if pinned}
            <Button on:click={() => updateQuestStatus('starred')} title="Save changes">
              <Star stroke="white" />
            </Button>
          {:else if starred}
            <Button on:click={() => updateQuestStatus('pinned')} title="Save changes">
              <Star fill="white" />
            </Button>
          {:else}
            <div />
          {/if}
          {#if editing}
            <Button on:click={updateQuestDetails} title="Save changes">
              <SaveIcon stroke="white" />
            </Button>
          {:else}
            <Button on:click={() => handleEditToggle(true)} title="Edit quest details">
              <FileEdit stroke="white" />
            </Button>
          {/if}
          <ConfirmationModal onConfirm={() => updateQuestStatus('deleted')}>
            <Button slot="trigger" title="Delete quest">
              <Trash stroke="white" />
            </Button>
            <span slot="message">This quest will be permanently deleted.</span>
          </ConfirmationModal>
          <ConfirmationModal onConfirm={() => updateQuestStatus('finished')}>
            <Button slot="trigger" title="Mark quest as finished">
              <CheckCircle stroke="white" />
            </Button>
            <span slot="message">This quest will be permanently marked as finished.</span>
          </ConfirmationModal>
        {/if}
      </div>
    {/if}
  </div>

  {#if expanded}
    <div class="px-8 pt-2 pb-4 flex flex-col gap-2" transition:slide>
      <div>
        {#if editing}
          <TextAreaField placeholder="Quest description" bind:value={quest.description} />
          <TextField placeholder="Enter group name..." label="Quest Group" bind:value={newGroup} />
        {:else}
          <div class="py-[0.125rem]">
            {quest.description}
          </div>
        {/if}
      </div>
      <div class=" text-white/80 flex flex-col gap-2">
        {#each quest.notes as note (note.id)}
          <QuestNote {note} deletable={editing} />
        {:else}
          <div class="text-white/80 italic">No updates added yet</div>
        {/each}
      </div>
      {#if editable}
        <div class="mt-4">
          <AddQuestNoteForm questId={quest.id} />
        </div>
      {/if}
    </div>
  {/if}
</div>
