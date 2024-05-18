<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { deleteQuestNoteMutation } from '$lib/persistance/quests';
  import { getRelativeTime } from '$lib/utils/time';
  import { Trash } from 'lucide-svelte';
  import type { Row } from 'src/app';
  import SvelteMarkdown from 'svelte-markdown';

  export let note: Row<'quest_note'> & { author?: Row<'profile'> };
  export let deletable = false;

  $: deleteComment = deleteQuestNoteMutation();
  $: handleDeleteComment = async (id: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await $deleteComment.mutateAsync(id);
    }
  };

  $: hasAuthor = !!note.author;
  $: posted = getRelativeTime(note.created_at);
</script>

<div class="relative">
  <div class="flex flex-col flex-grow">
    <div class="flex flex-row items-center bg-black/30 px-2 py-1 rounded-t">
      {#if hasAuthor}
        <img
          src={note.author.avatar_src}
          class="h-6 w-6 rounded-full absolute top-0 -left-2"
          alt=""
        />
        <span class="font-medium ml-4">{note.author.username}</span>
      {:else}
        <span class="font-medium ml-4">Someone</span>
        <div class="bg-gray-500 h-6 w-6 rounded-full absolute top-0 -left-2 text-center">?</div>
      {/if}
      <span class="text-gray-400 font-light text-sm ml-2">{posted}</span>
      {#if deletable}
        <Button
          class="ml-auto"
          on:click={() => handleDeleteComment(note.id)}
          title="Delete comment"
        >
          <Trash class="text-red-500" />
        </Button>
      {/if}
    </div>
  </div>
  <div class="bg-offwhite/95 text-offblack rounded-b-2xl p-2 px-6 flex flex-row">
    <SvelteMarkdown
      source={note.content.replaceAll('\n', '<br />')}
      options={{ break: true, gfm: true }}
    />
  </div>
</div>
