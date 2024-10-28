<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { salvageRefinement } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';

  interface Props {
    item: MP_Refinement;
  }

  let { item }: Props = $props();

  let mutation = salvageRefinement();
</script>

<div class="flex flex-col gap-4 w-full">
  If you salavage this, it will lose half of the MP assigned to it. Are you suuureee?
  <Button class="mx-auto" on:click={() => $mutation.mutate(item)}>Salvage</Button>
</div>
