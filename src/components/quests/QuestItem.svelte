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

  interface Props {
    quest: Quest;
    preview?: boolean;
  }

  let { quest = $bindable(), preview = false }: Props = $props();

  let expanded = $state(false);
  let editing = $state(false);
  let newGroup = $state('');

  let handleEditToggle = $derived((newValue: boolean = null) => {
    editing = newValue ?? !editing;
    if (editing === true) {
      newGroup = quest.group;
      expanded = true;
    }
  });

  let handleExpandToggle = $derived(() => {
    expanded = !expanded;
    if (expanded === false) {
      editing = false;
    }
  });

  let update = updateQuestMutation();
  let del = deleteQuestMutation();

  let updateQuestStatus = $derived(async (newStatus: Quest['status']) => {
    await $update.mutateAsync({ id: quest.id, status: newStatus });
  });

  let updateQuestDetails = $derived(async () => {
    await $update.mutateAsync({
      id: quest.id,
      name: quest.name,
      description: quest.description,
      group: newGroup
    });
    editing = false;
  });

  let loading = $derived($update.isLoading && $del.isLoading);

  let finished = $derived(quest.status === 'finished');
  let pinned = $derived(quest.status === 'pinned');
  let starred = $derived(quest.status === 'starred');
  let editable = $derived(!finished && quest.status !== 'deleted');
  let deleted = $derived(quest.status === 'deleted');
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
        <div></div>
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
            <div></div>
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
            {#snippet trigger()}
                        <Button  title="Delete quest">
                <Trash stroke="white" />
              </Button>
                      {/snippet}
            {#snippet message()}
                        <span >This quest will be permanently deleted.</span>
                      {/snippet}
          </ConfirmationModal>
          <ConfirmationModal onConfirm={() => updateQuestStatus('finished')}>
            {#snippet trigger()}
                        <Button  title="Mark quest as finished">
                <CheckCircle stroke="white" />
              </Button>
                      {/snippet}
            {#snippet message()}
                        <span >This quest will be permanently marked as finished.</span>
                      {/snippet}
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
