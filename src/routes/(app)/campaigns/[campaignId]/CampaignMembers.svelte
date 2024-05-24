<script lang="ts">
  import { page } from '$app/stores';
  import Heading from '$components/layout/Heading.svelte';
  import { extractData } from '$lib/utils/requests';
  import { createQuery } from '@tanstack/svelte-query';
  import { supabase } from '$lib/utils/supabaseClient';

  $: ({ campaign } = $page.data);
  $: campaignMembers = createQuery({
    enabled: !!campaign?.id,
    queryKey: ['campaign-members', campaign?.id],
    queryFn: async () => {
      return extractData(
        await supabase
          .from('campaign_member')
          .select(`*, profile (username, avatar_src)pnpm run dev`)
          .eq('campaign_id', campaign?.id)
          .order('username', {
            foreignTable: 'profile'
          })
      );
    }
  });

  $: console.log($campaignMembers.data);
</script>

<div>
  <Heading type="Section Heading">Campaign Characters</Heading>
  <ul class="">
    {#each $campaignMembers.data ?? [] as member (member.id)}
      <li class="flex flex-row flex-1 bg-white/10 rounded-lg overflow-hidden mb-2">
        <img
          class="w-8 h-8 object-cover pointer-events-none"
          src={member.profile?.avatar_src}
          alt=""
        />
        <div class="text-xl my-auto ml-4">{member.profile.username}</div>
      </li>
    {:else}
      No membahs
    {/each}

    <!-- {#if activeCharacters}
      {#each activeCharacters as character}
        <li class="flex flex-row flex-1 bg-white/10 rounded-lg overflow-hidden mb-2">
          <img class="w-14 h-14 object-cover pointer-events-none" src={character.img_src} alt="" />
          <div class="text-2xl my-auto ml-4">{character.name}</div>
        </li>
      {/each}
    {/if} -->
  </ul>
</div>
