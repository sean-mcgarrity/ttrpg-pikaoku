<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import BackTo from '$components/BackTo.svelte';
  import LandingLink from '$components/BigLink.svelte';
  import LinkButton from '$components/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import IfFeatureFlag from '$components/layout/IfFeatureFlag.svelte';
  import { getCharactersQuery } from '$lib/persistance/campaign';
  import { List } from 'lucide-svelte';
  import QuestsPeek from './QuestsPeek.svelte';

  $: campaignId = $page.params.campaignId;
  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;
  $: activeCharacters = characters?.filter((c) => c.status === 'alive');

  export let data;
  $: campaign = data.campaign;
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>

<!-- <BackTo href={`/`} text="Campaigns" /> -->
<Heading type="Page Heading">{campaign.name}</Heading>
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
    {#if campaign.discord_link}
      <a
        href={campaign.discord_link}
        class="h-14 bg-[#5865F2] px-6 items-center rounded shadow hover:brightness-110 flex flex-row"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/discord_logo_white.png" alt="Discord Logo" />
      </a>
    {/if}
    <a
      href={'https://forms.gle/KXDHR2qn8CiCJVE37'}
      class="h-14 bg-emerald-600 px-6 py-3 rounded shadow hover:brightness-105 text-2xl font-medium flex flex-row items-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <List class="custom-icon inline h-[40px] text-xl" />
      Feedback
    </a>
    <IfFeatureFlag flag="monster-parts">
      <LandingLink
        size="sm"
        title="Monster Parts"
        href={`/campaigns/${campaignId}/monster-parts`}
        bgImgSrc="/images/monster-parts-banner.webp"
      />
    </IfFeatureFlag>
    <IfFeatureFlag flag="bastions">
      <LandingLink
        size="sm"
        title="BASTION BUILDING"
        href={`/campaigns/${campaignId}/bastions`}
        bgImgSrc="https://i.imgur.com/WFsKg7W.jpeg"
      />
    </IfFeatureFlag>
    <IfFeatureFlag flag="handouts">
      <LandingLink
        size="sm"
        title="Handouts"
        href={`/campaigns/${campaignId}/handouts`}
        bgImgSrc="https://i.imgur.com/38Wjk61.jpeg"
      />
    </IfFeatureFlag>

    <AdminOnly>
      <div class="w-full mx-auto max-w-sm text-center">
        <LinkButton href={`/campaigns/${campaignId}/edit`}>Edit campaign &#9881;</LinkButton>
      </div>
    </AdminOnly>
  </div>
</div>
