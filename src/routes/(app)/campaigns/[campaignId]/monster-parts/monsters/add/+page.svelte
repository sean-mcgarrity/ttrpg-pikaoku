<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { createMpSource } from '$lib/persistance/monster-parts';
  import type { MP_Source } from '$lib/systems/pf2e_monster_parts';
  import MonsterEditor from '../MonsterEditor.svelte';

  let monster: MP_Source = $state({
    name: '',
    level: 1,
    quantity: 1,
    enables: []
  });

  let campaignId = $derived($page.params.campaignId);
  let query = $derived(createMpSource());
  let handleClick = $derived(() => {
    $query.mutate(monster, {
      onSuccess: () => {
        goto(`/campaigns/${campaignId}/monster-parts/monsters`);
      }
    });
  });
</script>

<div class="relative">
  <Heading type="Page Heading">Create monster</Heading>
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    {#if $query.isLoading}
      <LoadingInsert />
    {/if}
    <MonsterEditor bind:monster onSave={handleClick} />
  </div>
</div>
