<script lang="ts">
  import TextField from '$components/forms/controls/TextField.svelte';
  import Button from '$components/buttons/Button.svelte';
  import { ArrowBigUp, BookDown, ListChecks, Save } from 'lucide-svelte';

  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import ItemTypeSelector from '$components/monster-parts/ItemTypeSelector.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import ImbuementLevelEditor from './ImbuementLevelEditor.svelte';
  import { byKeyAsc } from '$lib/utils/iterators';
  import TraitSelector from '$components/monster-parts/TraitSelector.svelte';

  interface Props {
    imbuement: Imbuement;
    onSave: (imbuement: Partial<Imbuement>) => void;
  }

  let { imbuement = $bindable(), onSave }: Props = $props();

  let activeLevel = $state(null);
  let pane: 'requires' | 'levels' | 'templates' = $state('levels');
  let sessionTimeStart = $state(Date.now());

  let handleSave = $derived(() => {
    const saveImbuement: Omit<Imbuement, 'id' | 'types'> = {
      ...imbuement,
      enabled: true
    };

    if (onSave) {
      onSave(saveImbuement);
    }
  });

  let addStage = $derived(() => {
    const previousStage = imbuement.levels[imbuement.levels.length - 1];
    const newImbuementLevel = imbuement.levels.length === 0 ? 1 : previousStage.level + 1;
    const seqId = (++sessionTimeStart).toString(36);
    imbuement.levels = [
      ...imbuement.levels,
      {
        sequenceId: seqId,
        level: newImbuementLevel,
        benefits: imbuement.levels.length > 0 ? previousStage.benefits.map((x) => x) : [''],
        preview: imbuement.levels.length > 0 ? previousStage.preview : ''
      }
    ].sort(byKeyAsc('level'));
    activeLevel = seqId;
  });

  let deleteStage = $derived((stage: Imbuement['levels'][number]) => {
    imbuement.levels = imbuement.levels.filter((s) => s.sequenceId !== stage.sequenceId);
  });
</script>

<div
  class="grid grid-cols-1 md:grid-cols-3 md:divide-x-2 divide-white/10 bg-slate-800 rounded overflow-hidden"
>
  <div class="flex flex-col max-w-lg divide-y-2 divide-white/10 bg-slate-700/30">
    <div class="flex flex-col gap-4 p-4">
      <TextField bind:value={imbuement.name} label="Name" />
      <TextAreaField bind:value={imbuement.description} label="Description" />
    </div>
    <div class="flex flex-col max-w-lg gap-4 p-4">
      <ItemTypeSelector bind:value={imbuement.type} />
    </div>
    <div class=" py-2 w-full flex mt-auto">
      <Button class="mx-auto" on:click={handleSave}>Save <Save /></Button>
    </div>
  </div>
  <div class="flex flex-col divide-y-2 divide-white/10 col-span-2">
    <div class="p-2">
      <Button on:click={() => (pane = 'levels')}>Levels <ArrowBigUp /></Button>
      <Button on:click={() => (pane = 'requires')}>Requirements <ListChecks /></Button>
      <Button on:click={() => (pane = 'templates')}>Templates <BookDown /></Button>
    </div>
    {#if pane === 'levels'}
      <div class="p-2 flex flex-col gap-1 flex-1">
        {#if imbuement.levels.length === 0}
          <div
            class="my-auto mx-auto px-40 py-36 text-center bg-black/30 border-4 rounded border-dashed border-white/10 shadow"
          >
            No levels yet!
          </div>
        {/if}
        {#each imbuement.levels as level, index}
          <div class="even:bg-black/10 rounded">
            {#if level.sequenceId === activeLevel}
              <ImbuementLevelEditor
                bind:level
                onDelete={deleteStage}
                maxLevel={index === imbuement.levels.length - 1
                  ? 20
                  : imbuement.levels[index + 1].level - 1}
                minLevel={index > 0 ? imbuement.levels[index - 1].level + 1 : 1}
              />
            {:else}
              <button
                onclick={() => (activeLevel = level.sequenceId)}
                class="block w-full text-left py-1 px-2 rounded cursor-pointer hover:bg-white/5"
                >{level.level} - {level.preview}</button
              >
            {/if}
          </div>
        {/each}
      </div>
      <div class=" py-2 w-full flex mt-auto">
        <Button class="mx-auto" on:click={addStage}>Add level +</Button>
      </div>
    {/if}
    {#if pane === 'requires'}
      <div class="p-4 flex flex-col gap-1 divide-y divide-white/20 overflow-y-scroll flex-1">
        <TraitSelector bind:selected={imbuement.requires} />
      </div>
    {/if}
    {#if pane === 'templates'}
      <div class="p-4 flex flex-col gap-1 divide-y divide-white/20 overflow-y-scroll flex-1">
        I fucking wish
      </div>
    {/if}
  </div>
</div>
