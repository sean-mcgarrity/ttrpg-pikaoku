<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import { ArrowUp, ArrowDown, Trash, X, Plus } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let minLevel = 1;
  export let maxLevel = 20;

  export let level: Imbuement['levels'][number];

  $: moveUp = () => (level.level = Math.max(minLevel, level.level - 1));
  $: moveDown = () => (level.level = Math.min(maxLevel, level.level + 1));

  export let onDelete = (value: Imbuement['levels'][number]) =>
    console.log('Unimplemented delete for', value.level);

  const handleDelete = () => onDelete(level);
</script>

<div transition:slide|local>
  <div class="w-full text-left py-1 px-2 rounded flex flex-row">
    <div class="whitespace-nowrap mr-2">{level.level} -</div>
    <TextField
      placeholder="Level preview"
      value={level.preview}
      on:change={(e) => (level.preview = e.target['value'])}
    />
  </div>
  <div class="ml-10">
    <div class="py-2 flex flex-col gap-2 w-full">
      {#each level.benefits as benefit, i}
        <div class="flex flex-row">
          <TextField
            classs="w-full"
            placeholder="Benefit"
            value={benefit}
            on:change={(e) => (level.benefits[i] = e.target['value'])}
          />
          <Button
            class="text-orange-700 font-bold my-auto ml-1"
            on:click={() => (level.benefits = level.benefits.filter((b, bi) => i !== bi))}
            ><X /></Button
          >
        </div>
      {/each}
    </div>
    <div class="flex flex-row justify-between">
      <Button on:click={() => (level.benefits = [...level.benefits, ''])}><Plus /></Button>
      <Button on:click={moveUp} disabled={level.level <= minLevel}>
        Move <ArrowUp class="w-full" />
      </Button>
      <Button on:click={moveDown} disabled={level.level >= maxLevel}>
        Move <ArrowDown class="w-full" />
      </Button>
      <Button on:click={handleDelete}>
        <Trash />
      </Button>
    </div>
  </div>
</div>
