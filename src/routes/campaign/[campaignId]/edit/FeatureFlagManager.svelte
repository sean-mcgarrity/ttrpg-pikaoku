<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import {
    disableCampaignFeatureFlag,
    enableCampaignFeatureFlag,
    getCurrentCampaign
  } from '$lib/persistance/campaign';
  import { CheckCircle } from 'lucide-svelte';
  import { hasFeatureFlag } from '$lib/utils/feature-flags';
  import cs from 'classnames';

  const campaignQuery = getCurrentCampaign();
  $: campaign = $campaignQuery.data;

  const flags = [
    {
      value: 'bastions',
      label: 'Bastion builder'
    },
    {
      value: 'character-builder',
      label: 'Character builder'
    },
    {
      value: 'monster-parts',
      label: 'Monster parts'
    },
    {
      value: 'quests',
      label: 'Quests'
    },
    {
      value: 'handouts',
      label: 'Handouts'
    }
  ] as const;

  let enableMutation = enableCampaignFeatureFlag();
  let disableMutation = disableCampaignFeatureFlag();

  $: loading = $enableMutation.isLoading || $disableMutation.isLoading || $campaignQuery.isLoading;

  $: handleClick = async (flag: string) => {
    if (loading) {
      return;
    }
    if (!campaign) {
      return;
    }

    if (hasFeatureFlag(campaign, flag)) {
      await $disableMutation.mutateAsync(flag);
    } else {
      await $enableMutation.mutateAsync(flag);
    }
    $campaignQuery.refetch();
  };
</script>

<div>
  <Heading type="Subsection Heading">Flag editor</Heading>
  {#if loading}
    <LoadingInsert />
  {/if}
  <div class="flex flex-col gap-2 max-w-sm mx-auto">
    {#each flags as flag}
      {@const enabled = !!campaign && hasFeatureFlag(campaign, flag.value)}
      <button
        class={cs(
          enabled ? 'bg-white' : 'bg-white/70 hover:bg-white/80',
          'rounded px-4 py-2 text-offblack flex flex-row justify-between items-center '
        )}
        on:click={() => handleClick(flag.value)}
      >
        <div class="text-xl">
          {flag.label}
        </div>
        {#if enabled}
          <CheckCircle class="custom-icon h-12 text-green-700 inline-block" />
        {:else}
          <CheckCircle class="invisible custom-icon h-12 text-green-700 inline-block" />
        {/if}
      </button>
    {/each}
  </div>
</div>
