<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { extractData, getSupabase } from '$lib/utils/requests';
  import { createQuery } from '@tanstack/svelte-query';
  import { MailPlus } from 'lucide-svelte';

  $: campaign = $page.data.campaign;

  $: console.log('campaign', campaign);

  $: getInvitesQuery = createQuery(
    ['campaign-invites', campaign?.id],
    async () => {
      const sup = getSupabase();
      return extractData(
        await sup.from('campaign_invite').select('*').eq('campaign_id', campaign.id)
      );
    },
    {
      enabled: !!campaign?.id
    }
  );

  $: console.log('invites', $getInvitesQuery.data);
</script>

<div>
  <Heading type="Subsection Heading">Invite Links</Heading>
  <div class="flex flex-col gap-4">No invites</div>
  <Button class="">New invite <MailPlus /></Button>
</div>
