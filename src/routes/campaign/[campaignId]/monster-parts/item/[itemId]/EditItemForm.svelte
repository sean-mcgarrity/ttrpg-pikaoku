<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import CharacterSelect from '$components/monster-parts/CharacterSelect.svelte';
  import { deleteRefinementImbuement, updateRefinement } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { Save, X } from 'lucide-svelte';

  export let refinement: MP_Refinement;
  export let afterSave: () => void = () => {};

  const mutation = updateRefinement();

  let name = refinement.name;
  let description = refinement.description;
  let ownerId = refinement.owner_id.toString();

  const removeImbuement = deleteRefinementImbuement();

  $: handleSave = async () => {
    await $mutation.mutateAsync({
      id: refinement.id,
      name,
      description,
      owner_id: parseInt(ownerId) || refinement.owner_id
    });
    afterSave();
  };

  $: imbuements = refinement.imbuements;
</script>

<div class="flex flex-col gap-2 max-w-lg w-full mx-auto bg-white/10 rounded p-8">
  <h3 class="text-xl font-semibold">Edit item</h3>
  <TextField label="Name" bind:value={name} autofocus />
  <TextAreaField label="Description" bind:value={description} />
  <CharacterSelect bind:ownerId />

  <div class="flex flex-row gap-2 justify-center">
    <Button on:click={handleSave}
      >Save
      <Save />
    </Button>
  </div>
</div>

{#if imbuements.length > 0}
  <div class="flex flex-col gap-2 my-6 px-6">
    <h4 class="text-lg font-semibold">Imbuements</h4>
    {#each imbuements as imbuement (imbuement.id)}
      <div class="bg-black/80 px-4 py-2 rounded">
        <span class="inline-flex justify-between w-full">
          <span class="my-auto text-ellipsis overflow-hidden whitespace-nowrap"
            >{imbuement.name}</span
          >
          <Button
            on:click={() => {
              if (confirm(`Are you sure you want to remove ${imbuement.name}?`)) {
                $removeImbuement.mutate({
                  refinementId: refinement.id,
                  imbuementId: imbuement.id
                });
              }
            }}><X /></Button
          >
        </span>
      </div>
    {/each}
  </div>
{/if}
