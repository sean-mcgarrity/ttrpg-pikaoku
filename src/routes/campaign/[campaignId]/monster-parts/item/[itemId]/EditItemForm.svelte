<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { deleteRefinementImbuement, updateRefinement } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { X } from 'lucide-svelte';

  export let refinement: MP_Refinement;
  export let afterSave: () => void = () => {};
  export let onCancel: () => void = () => {};

  const mutation = updateRefinement();

  let name = refinement.name;
  let description = refinement.description;

  const removeImbuement = deleteRefinementImbuement();

  $: handleSave = async () => {
    await $mutation.mutateAsync({ id: refinement.id, name, description });
    afterSave();
  };

  $: handleCancel = () => {
    onCancel();
  };

  $: imbuements = refinement.imbuements;
  $: console.log('imbuements', imbuements);
</script>

<div class="flex flex-col gap-2">
  <h3 class="text-xl font-semibold">Edit item</h3>
  <TextField label="Name" bind:value={name} />
  <TextAreaField label="Description" bind:value={description} />
  {#if imbuements.length > 0}
    <div class="flex flex-col gap-2">
      <h4 class="text-lg font-semibold">Imbuements</h4>
      <ul class="list-disc w-3/5 ml-10">
        {#each imbuements as imbuement (imbuement.id)}
          <li class="list-item">
            <span class="inline-flex justify-between w-full">
              <span class="my-auto">{imbuement.name}</span>
              <Button
                on:click={() => {
                  $removeImbuement.mutate({
                    refinementId: refinement.id,
                    imbuementId: imbuement.id
                  });
                }}>Remove <X /></Button
              >
            </span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <div class="flex flex-row gap-2">
    <Button on:click={handleSave}>Save</Button>
    <Button on:click={handleCancel}>Cancel</Button>
  </div>
</div>
