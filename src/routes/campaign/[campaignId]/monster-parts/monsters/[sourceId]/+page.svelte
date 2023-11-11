<script lang="ts">
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getUsableSourceById } from '$lib/persistance/monster-parts';
  import { page } from '$app/stores';
  import LinkButton from '$components/LinkButton.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import MonsterInfoCard from './MonsterInfoCard.svelte';
  import { StepBack } from 'lucide-svelte';

  $: query = getUsableSourceById($page.params.sourceId);

  $: monster = $query.data;
</script>

<div class="relative pt-4">
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    <div class="flex flex-col justify-center items-center w-full gap-4">
      <LinkButton href={`/campaign/${getCampaignId()}/monster-parts/monsters`}
        ><StepBack /> Back to all monsters</LinkButton
      >
      {#if $query.isFetching || $query.isLoading}
        <LoadingInsert />
      {:else if $query.isFetched && !!$query.data}
        <MonsterInfoCard {monster} />
        <LinkButton href="/campaign/{getCampaignId()}/monster-parts/monsters/{monster.id}/edit"
          >Edit</LinkButton
        >
      {/if}
    </div>
  </div>
</div>
