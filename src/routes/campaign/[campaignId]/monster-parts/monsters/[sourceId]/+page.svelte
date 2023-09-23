<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { getSourceFromParam, updateSource } from '$lib/persistance/monster-parts';
  import MonsterEditor from '../MonsterEditor.svelte';

  const query = getSourceFromParam();

  const mutation = updateSource();

  $: monster = $query.data;

  $: handleClick = () => {
    $mutation.mutate(monster);
  };
</script>

<div class="relative">
  {#if $query.isFetching}
    <LoadingInsert />
  {/if}
  <Heading type="Page Heading">Update monster</Heading>
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    {#if $query.isLoading}
      <LoadingInsert />
    {:else if $query.isFetched && !!$query.data}
      <MonsterEditor bind:monster onSave={handleClick} />
    {/if}
  </div>
</div>
