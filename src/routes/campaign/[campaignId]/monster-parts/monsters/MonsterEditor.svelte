<script lang="ts">
  import Button from '$components/Button.svelte';
  import IntegerTicker from '$components/forms/controls/IntegerTicker.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import TraitSelector from '$components/monster-parts/TraitSelector.svelte';
  import type { MP_Source } from '$lib/systems/pf2e_monster_parts';
  import { Save } from 'lucide-svelte';

  export let monster: MP_Source;
  export let onSave: (monster: Partial<MP_Source>) => void;

  let handleClick = () => {
    if (onSave) {
      onSave(monster);
    }
  };
</script>

<div class="flex flex-col gap-4 w-full">
  <div class="bg-white/10 p-4 rounded">
    <TextField label="Name" bind:value={monster.name} />
    <div class="flex flex-row gap-4 mt-4">
      <IntegerTicker label="Level" min={-4} max={25} bind:value={monster.level} />
      <IntegerTicker label="Quantity" min={1} max={30} bind:value={monster.quantity} />
    </div>
  </div>
  <div class="mx-auto">
    <Button on:click={handleClick}>Create <Save /></Button>
  </div>
</div>
<div class="flex flex-col gap-4 w-full">
  <Heading type="Subsection Heading">Enables traits</Heading>
  <TraitSelector bind:selected={monster.enables} />
</div>
