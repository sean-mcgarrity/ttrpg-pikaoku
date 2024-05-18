<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import AddQuestNoteForm from '$components/quests/AddQuestNoteForm.svelte';
  import QuestNote from '$components/quests/QuestNote.svelte';
  import type { Quest } from 'src/app';

  export let quest: Quest;

  let editing = true;
</script>

<div class="p-6 pb-4 flex flex-col gap-4 bg-white/10 shadow rounded text-white">
  <div>
    <Heading type="Page Heading">{quest.name}</Heading>
    <Heading type="Subsection Heading">Summary</Heading>
    <div class="py-[0.125rem]">
      {quest.description}
    </div>
  </div>
  <div>
    <Heading type="Subsection Heading">Description</Heading>
    <div class="py-[0.125rem]">
      {quest.description}
    </div>
    <div class="py-[0.125rem]">
      {quest.description}
    </div>
  </div>
  <div>
    <Heading type="Subsection Heading">Comments</Heading>
    <div class=" text-white/80 flex flex-col gap-2">
      {#each quest.notes as note (note.id)}
        <QuestNote {note} deletable={editing} />
      {:else}
        <div class="text-white/80 italic">No updates added yet</div>
      {/each}
    </div>
  </div>
  {#if true}
    <div class="mt-4">
      <AddQuestNoteForm questId={quest.id} />
    </div>
  {/if}
</div>
