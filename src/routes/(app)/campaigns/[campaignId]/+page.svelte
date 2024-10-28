<script lang="ts">
  import LandingLink from '$components/buttons/BigLink.svelte';
  import IfFeatureFlag from '$components/layout/IfFeatureFlag.svelte';
  import {
    Headset,
    List,
    PawPrint,
    ScrollText,
    BookOpenText,
    Anvil,
    ExternalLink
  } from 'lucide-svelte';
  import QuestsPeek from './quests/QuestsPeek.svelte';
  import BigLinkButton from '$components/buttons/BigLinkButton.svelte';
  import CampaignCharacters from './CampaignCharacters.svelte';
  import CardLink from './CardLink.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getCurrentCampaign } from '$lib/persistance/campaign';

  const campaignQuery = getCurrentCampaign();
  let campaign = $derived($campaignQuery.data);
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>
{#if campaign}
  <div class="flex flex-col gap-6">
    <div class="w-full flex flex-col gap-8 mx-auto">
      <!-- <QuestsPeek /> -->
      <div class="grid grid-cols-4">
        <CardLink to={`/campaigns/${campaign.id}/quests`} Icon={ScrollText} title="Quests" />
      </div>
      <div>
        <Heading type="Section Heading">Tools</Heading>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <IfFeatureFlag flag="monster-parts">
            <CardLink
              to={`/campaigns/${campaign.id}/monster-parts`}
              Icon={PawPrint}
              title="Monster Parts Subsystem"
              description="Track monster parts and refined items"
              class="md:col-span-2"
            />
          </IfFeatureFlag>
          <IfFeatureFlag flag="handouts">
            <CardLink
              to={`/campaigns/${campaign.id}/handouts`}
              Icon={ScrollText}
              title="Handouts"
            />
          </IfFeatureFlag>
          <CardLink
            to={`/campaigns/${campaign.id}/summaries`}
            Icon={BookOpenText}
            title="Summaries"
          />
        </div>
      </div>
      <CampaignCharacters />
      <IfFeatureFlag flag="bastions">
        <LandingLink
          size="sm"
          title="BASTION BUILDING"
          href={`/campaigns/${campaign.id}/bastions`}
          bgImgSrc="https://i.imgur.com/WFsKg7W.jpeg"
        />
      </IfFeatureFlag>
      <div>
        <Heading type="Section Heading">Quick Links</Heading>
        <div class="grid grid-cols-1 md:grid-cols-3 sm:flex-row gap-4">
          <BigLinkButton colorClasses="bg-orange-700" href="https://seans-pf2e.forge-vtt.com/game">
            <Anvil class="custom-icon inline h-6 text-xl" />
            Foundry <ExternalLink class="ml-auto" />
          </BigLinkButton>
          {#if campaign.discord_link}
            <BigLinkButton colorClasses="bg-[#5865F2]" href={campaign.discord_link}>
              <Headset class="custom-icon inline h-6 text-xl" />
              Discord <ExternalLink class="ml-auto" />
            </BigLinkButton>
          {/if}
          <BigLinkButton colorClasses="bg-emerald-600" href="https://forms.gle/KXDHR2qn8CiCJVE37">
            <List class="custom-icon inline h-6 text-xl" />
            Feedback <ExternalLink class="ml-auto" />
          </BigLinkButton>
        </div>
      </div>
    </div>
  </div>
{/if}
