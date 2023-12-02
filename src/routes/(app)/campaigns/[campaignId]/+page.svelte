<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import LandingLink from '$components/buttons/BigLink.svelte';
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import IfFeatureFlag from '$components/layout/IfFeatureFlag.svelte';
  import { getCharactersQuery } from '$lib/persistance/campaign';
  import { List } from 'lucide-svelte';
  import QuestsPeek from './QuestsPeek.svelte';
  import CampaignMembers from './CampaignMembers.svelte';
  import BigLinkButton from '$components/buttons/BigLinkButton.svelte';

  $: campaignId = $page.params.campaignId;
  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;

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
    <CampaignMembers />
  </div>
  <div class="w-full flex flex-col gap-4 mx-auto">
    {#if campaign.discord_link}
      <BigLinkButton colorClasses="bg-[#5865F2]" href={campaign.discord_link}>
        <img
          src="/images/discord_logo_white.png"
          alt="Discord Logo"
          class="select-none"
          draggable={false}
        />
      </BigLinkButton>
    {/if}
    <BigLinkButton colorClasses="bg-emerald-600" href="https://forms.gle/KXDHR2qn8CiCJVE37">
      <List class="custom-icon inline h-[40px] text-xl" />
      Feedback
    </BigLinkButton>
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
    <LandingLink
      size="sm"
      title="Summaries"
      href={`/campaigns/${campaignId}/summaries`}
      bgImgSrc="https://i.imgur.com/gk0bb5b.jpeg"
    />
    <AdminOnly>
      <div class="w-full mx-auto max-w-sm text-center">
        <LinkButton href={`/campaigns/${campaignId}/edit`}>Edit campaign &#9881;</LinkButton>
      </div>
    </AdminOnly>
  </div>
</div>
