<script lang="ts">
  import { getSourceFromParam } from '$lib/persistance/monster-parts';

  const query = getSourceFromParam();
</script>

<div>Havin a look at a monster are ya?</div>
{#if $query.isFetching}
  <div>Doin a bitta loadin</div>
{/if}
{#if $query.isFetched && !!$query.data}
  <div>The monster's name is {$query.data.name}</div>
{/if}
