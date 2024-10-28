<script lang="ts">
  import { getCharactersQuery } from '$lib/persistance/campaign';
  import { page } from '$app/stores';
  import Heading from '$components/layout/Heading.svelte';

  const query = getCharactersQuery();

  const campaignId = $page.params.campaignId;
  let characters = $derived($query.data);
</script>

<div class="">
  <Heading type="Section Heading">Characters</Heading>
  {#if characters}
    <div class="flex flex-col md:flex-row flex-wrap justify-start gap-4">
      {#each characters as character}
        <a href={`/campaigns/${campaignId}/characters/${character.id}`} class="select-none">
          <div
            class="flex flex-col p-4 pb-2 px-8 bg-white/10 rounded text-center hover:bg-white/20 cursor-pointer hover:scale-105 transition-all duration-150"
          >
            <div class="bg-white rounded-full aspect-square mx-auto h-20 mb-2"></div>
            <div class="font-medium">{character.name}</div>
            <div class="opacity-90 text-sm text-gray-200 font-light">{character.name}</div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
