<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import { ArrowUp, ArrowDown, Trash, PlusCircle, X } from 'lucide-svelte';

  export let level: Imbuement['levels'][number] & Record<'rid', number> = {
    rid: Math.random(),
    level: 0,
    benefits: [],
    preview: ''
  };

  export let onDelete = (value: Imbuement['levels'][number]) =>
    console.log('Unimplemented delete for', value.level);

  const handleDelete = () => onDelete(level);
</script>

<div class=" rounded bg-gray-700 flex flex-row gap-4 min-h-[6rem] overflow-hidden">
  <div class="flex flex-col w-1/4 max-w-[60px] bg-gray-800">
    <button
      class="bg-orange-700 hover:brightness-75 cursor-pointer h-6"
      on:click={() => (level.level = Math.max(1, level.level - 1))}
    >
      <ArrowUp />
    </button>
    <div class="text-2xl m-auto">
      {level.level}
    </div>
    <button
      class="bg-orange-700 hover:brightness-75 cursor-pointer h-6"
      on:click={() => (level.level = Math.min(20, level.level + 1))}
    >
      <ArrowDown />
    </button>
  </div>
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
          class="text-orange-700 font-bold my-auto ml-2"
          on:click={() => (level.benefits = level.benefits.filter((b, bi) => i !== bi))}
          ><X /></Button
        >
      </div>
    {/each}
    <Button
      class="mr-auto text-sm text-white/80"
      on:click={() => (level.benefits = [...level.benefits, ''])}><PlusCircle /></Button
    >
    <TextField
      placeholder="Level preview"
      label="Preview"
      value={level.preview}
      on:change={(e) => (level.preview = e.target['value'])}
    />
  </div>
  <div class="w-12 inline-flex bg-gray-800 px-1">
    <Button class="m-auto" on:click={handleDelete}>
      <Trash class=" text-gray-400" />
    </Button>
  </div>
</div>
