<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import BackTo from '$components/BackTo.svelte';
  import LandingLink from '$components/BigLink.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import { getCharactersQuery } from '$lib/persistance/meta';
  import QuestsPeek from './QuestsPeek.svelte';

  $: campaignId = $page.params.campaignId;
  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;
  $: activeCharacters = characters?.filter((c) => c.status === 'alive');
  $: otherCharacters = characters?.filter((c) => c.status === 'dead');
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>

<BackTo href={`/`} text="Campaigns" />
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="md:col-span-2 flex flex-col gap-4">
    <QuestsPeek />
    <ul class="">
      {#if activeCharacters}
        {#each activeCharacters as character}
          <li class="flex flex-row flex-1 bg-white/10 rounded rounded-l-full overflow-hidden mb-2">
            <img
              class="w-14 h-14 object-cover pointer-events-none"
              src={character.img_src}
              alt=""
            />
            <div class="text-2xl my-auto ml-4">{character.name}</div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <div class="w-full flex flex-col gap-4 mx-auto">
    <LandingLink
      size="sm"
      title="Monster Parts"
      href={`/campaign/${campaignId}/monster-parts`}
      bgImgSrc="/images/monster-parts-banner.webp"
    />
    <LandingLink
      size="sm"
      title="BASTION BUILDING"
      href={`/campaign/${campaignId}/bastions`}
      bgImgSrc="https://i.imgur.com/WFsKg7W.jpeg"
    />
  </div>
  <AdminOnly>
    <div class="w-full mt-8 mx-auto max-w-sm text-center">
      <div class="w-3/5 mx-auto border-b border-solid border-white border-opacity-40 mb-4" />
      <LinkButton href={`/campaign/${campaignId}/edit`}>Edit campaign &#9881;</LinkButton>
    </div>
  </AdminOnly>
</div>
