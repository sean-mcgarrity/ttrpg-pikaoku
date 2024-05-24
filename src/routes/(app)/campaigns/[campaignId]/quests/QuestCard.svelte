<script lang="ts">
  import { PinIcon } from 'lucide-svelte';
  import type { Quest } from 'src/app';
  import cx from 'classnames';

  export let quest: Quest;
  export let link = false;

  let wrapper = link ? 'a' : 'div';
  let elementProps: any = {
    href: link ? `/campaigns/${quest.campaign_id}/quests/${quest.id}` : null
  };

  const commentorAvatars = Array.from(
    new Set(
      quest.notes.reduce((acc, note) => {
        if (note.author) {
          acc.push(note.author.avatar_src);
        }
        return acc;
      }, [])
    )
  ).splice(0, 3);

  console.log('the set', commentorAvatars);
</script>

<svelte:element
  this={wrapper}
  {...elementProps}
  class={cx(
    'relative flex flex-row gap-6 w-full transition-all duration-150 rounded shadow',
    'p-3 bg-white/5 hover:bg-white/10 cursor-pointer',
    'text-left items-start'
  )}
>
  <div class="bg-blue-400 rounded-lg aspect-square h-12 flex flex-col justify-center items-center">
    <PinIcon class="custom-icon h-10 w-10 rotate-45" />
  </div>
  <div>
    <div class="font-medium text-xl">{quest.name}</div>
    {#if quest.summary}
      <div class="">{quest.summary}</div>
    {:else}
      <div class="text-gray-400">No summary</div>
    {/if}
  </div>
  <div class="ml-auto flex flex-row my-auto min-w-10 -mr-2">
    {#each commentorAvatars as avatar}
      <img
        src={avatar}
        alt="avatar"
        class="h-10 w-10 rounded-full border border-white/50 -ml-4 bg-slate-900"
      />
    {/each}
  </div>
  <div class="flex flex-col h-full justify-between ">
    <div class="text-xl">{quest.notes.length}</div>
    <div class="text-sm">Comments</div>
  </div>
</svelte:element>
