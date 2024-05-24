<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import { deleteQuestNoteMutation, getQuestQuery } from '$lib/persistance/quests';
  import { getRelativeTime } from '$lib/utils/time';
  import SvelteMarkdown from 'svelte-markdown';
  import AddQuestNoteForm from '$components/quests/AddQuestNoteForm.svelte';
  import Avatar from '$components/Avatar.svelte';

  const query = getQuestQuery();
  $: quest = $query.data;

  $: deleteComment = deleteQuestNoteMutation();
  $: handleDeleteComment = async (id: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await $deleteComment.mutateAsync(id);
    }
  };
</script>

<div class="px-4">
  {#if $query.isLoading}
    <div>Loading...</div>
  {:else if $query.isError}
    <div>Error:</div>
  {:else}
    <Heading type="Page Heading">{quest.name}</Heading>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="col-span-2 flex flex-col gap-4">
        {#if quest.summary}
          <div class="text-white/80 italic">No updates added yet</div>
        {:else}
          <div class="text-white/80 italic">No summary</div>
        {/if}
        {#if quest.description}
          <div class="py-[0.125rem]">{quest.description}</div>
        {:else}
          <div class="text-white/80 italic">No description</div>
        {/if}
        <div class="border rounded-full border-white/10" />
        {#each quest.notes as note (note.id)}
          <Avatar profile={note.author} />
          <div class="relative">
            <div class="flex flex-col flex-grow">
              <div class="flex flex-row items-center bg-black/30 px-2 py-1 rounded-t">
                {#if !!note.author}
                  <img
                    src={note.author.avatar_src}
                    class="h-6 w-6 rounded-full absolute top-0 -left-2"
                    alt=""
                  />
                  <span class="font-medium ml-4">{note.author.username}</span>
                {:else}
                  <span class="font-medium ml-4">Someone</span>
                  <div class="bg-gray-500 h-6 w-6 rounded-full absolute top-0 -left-2 text-center">
                    ?
                  </div>
                {/if}
                <span class="text-gray-400 font-light text-sm ml-2"
                  >{getRelativeTime(note.created_at)}</span
                >
              </div>
            </div>
            <div class="bg-offwhite/95 text-offblack rounded-b-2xl p-2 px-6 flex flex-row">
              <SvelteMarkdown
                source={note.content.replaceAll('\n', '<br />')}
                options={{ break: true, gfm: true }}
              />
            </div>
          </div>
        {:else}
          <div class="text-white/80 italic">No updates added yet</div>
        {/each}
        <AddQuestNoteForm questId={quest.id} />
      </div>

      <div class="bg-white/10 p-3 rounded shadow">Side content</div>
    </div>
  {/if}
</div>
