<script lang="ts">
  import { PinIcon } from 'lucide-svelte';
  import cx from 'classnames';
  import Avatar from '$components/Avatar.svelte';
  import type { Tables } from '$types/database';
  import { getRelativeTime } from '$lib/utils/time';

  interface Props {
    quest: Tables<'quest'> & {
    notes: (Tables<'quest_note'> & { author: Tables<'profile'> })[];
  };
    link?: boolean;
  }

  let { quest, link = false }: Props = $props();

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
      }, [] as Tables<'profile'>['avatar_src'][])
    )
  ).splice(0, 3);
</script>

<svelte:element
  this={wrapper}
  {...elementProps}
  class={cx(
    'flex flex-row gap-6 w-full transition-all duration-150 rounded shadow',
    'p-3 bg-white/5 hover:bg-white/10 cursor-pointer',
    'text-left items-start'
  )}
>
  <div
    class="bg-blue-400 rounded-lg aspect-square h-12 flex flex-col justify-center items-center my-auto"
  >
    <PinIcon class="custom-icon h-10 w-10 rotate-45" />
  </div>
  <div>
    <div>
      <div class="text-sm font-light opacity-60">Created {getRelativeTime(quest.created_at)}</div>
    </div>
    <div class="font-medium text-xl">{quest.name}</div>
    {#if quest.summary}
      <div class="">{quest.summary}</div>
    {:else}
      <div class="text-gray-300">No summary</div>
    {/if}
  </div>
  <div class="ml-auto flex flex-row my-auto min-w-10 -mr-1">
    {#each commentorAvatars as avatar}
      <Avatar profile={{ avatar_src: avatar }} size="medium" overlapped />
    {/each}
  </div>
  <div class="flex flex-col my-auto">
    <div class="text-xl font-medium">{quest.notes.length}</div>
    <div class="text-sm">Comments</div>
  </div>
</svelte:element>
