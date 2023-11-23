<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import BackTo from '$components/BackTo.svelte';
  import LandingLink from '$components/BigLink.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import IfFeatureFlag from '$components/layout/IfFeatureFlag.svelte';
  import { getCharactersQuery } from '$lib/persistance/campaign';
  import { hasFeatureFlag } from '$lib/utils/feature-flags';
  import QuestsPeek from './QuestsPeek.svelte';

  $: campaignId = $page.params.campaignId;
  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;
  $: activeCharacters = characters?.filter((c) => c.status === 'alive');
  // $: otherCharacters = characters?.filter((c) => c.status === 'dead');

  export let data;
  $: campaign = data.campaign;
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>

<BackTo href={`/`} text="Campaigns" />
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="md:col-span-2 flex flex-col gap-4">
    <QuestsPeek />
    <div>
      <Heading type="Section Heading">Campaign Characters</Heading>
      <ul class="">
        {#if activeCharacters}
          {#each activeCharacters as character}
            <li class="flex flex-row flex-1 bg-white/10 rounded-lg overflow-hidden mb-2">
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
  </div>
  <div class="w-full flex flex-col gap-4 mx-auto">
    <IfFeatureFlag flag="monster-parts">
      <LandingLink
        size="sm"
        title="Monster Parts"
        href={`/campaign/${campaignId}/monster-parts`}
        bgImgSrc="/images/monster-parts-banner.webp"
      />
    </IfFeatureFlag>
    <IfFeatureFlag flag="bastions">
      <LandingLink
        size="sm"
        title="BASTION BUILDING"
        href={`/campaign/${campaignId}/bastions`}
        bgImgSrc="https://i.imgur.com/WFsKg7W.jpeg"
      />
    </IfFeatureFlag>
    <IfFeatureFlag flag="handouts">
      <LandingLink size="sm" title="Handouts" href="" bgImgSrc="https://i.imgur.com/38Wjk61.jpeg" />
    </IfFeatureFlag>

    <AdminOnly>
      <div class="w-full mx-auto max-w-sm text-center">
        <LinkButton href={`/campaign/${campaignId}/edit`}>Edit campaign &#9881;</LinkButton>
      </div>
    </AdminOnly>
  </div>
</div>
