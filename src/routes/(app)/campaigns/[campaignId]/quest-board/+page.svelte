<script>
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import SuccessCard from '$components/pf2e/SuccessCard.svelte';
  import BackToCampaign from '../BackToCampaign.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import AdminOnly from '$components/AdminOnly.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { getSupabase, extractData } from '$lib/utils/requests';

  let campaignId = getCampaignId();
  let supabase = getSupabase();

  let questOptions = createQuery({
    queryKey: ['quest-board', campaignId],
    queryFn: async () => {
      return extractData(
        await supabase
          .from('pf2e_success_card')
          .select('*, child_card:pf2e_success_card (*)')
          .eq('campaign_id', campaignId)
          .eq('card_type', 'quest')
      );
    }
  });

  $: quests = $questOptions.data ?? [];

  $: console.log('quests', quests);
</script>

<BackToCampaign />
<Heading type="Page Heading">Quest Board</Heading>

<div class=" bg-white/10 p-2 rounded mb-4 flex flex-row gap-4 items-center">
  <TextField placeholder="Filter quests by name, description, tag" />
  <AdminOnly>
    <LinkButton class="whitespace-nowrap" href={`/campaigns/${campaignId}/quest-board/new`} `>
      Add Quest</LinkButton
    >
  </AdminOnly>
</div>

{#each quests as quest}
  <SuccessCard successCard={quest} />
{:else}
  <div class="bg-white/5 rounded p-2 text-center">
    <p>No quests found</p>
  </div>
{/each}
