<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { deleteMpSource, getSourceFromParam, updateSource } from '$lib/persistance/monster-parts';
  import MonsterEditor from '../../MonsterEditor.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const query = getSourceFromParam();

  const mutation = updateSource();

  $: deleteSourceM = deleteMpSource();
  $: monster = $query.data;

  $: handleClick = () => {
    $mutation.mutate(monster, {
      onSuccess: () => {
        goto(`/campaign/${$page.params.campaignId}/monster-parts/monsters`);
      }
    });
  };

  $: handleDelete = () => {
    $deleteSourceM.mutate($query.data.id, {
      onSuccess: () => {
        goto(`/campaign/${$page.params.campaignId}/monster-parts/monsters`);
      }
    });
  };
</script>

<div class="relative">
  {#if $query.isFetching}
    <LoadingInsert />
  {/if}
  {#if $query.isLoading}
    <Heading type="Page Heading">Edit ...</Heading>
  {:else}
    <Heading type="Page Heading">Edit {monster.name}</Heading>
  {/if}
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    {#if $query.isLoading}
      <LoadingInsert />
    {:else if $query.isFetched && !!$query.data}
      <MonsterEditor bind:monster onSave={handleClick} onDelete={handleDelete} />
    {/if}
  </div>
</div>
