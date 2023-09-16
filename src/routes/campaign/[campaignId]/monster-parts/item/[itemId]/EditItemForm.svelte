<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { updateRefinement } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';

  export let refinement: MP_Refinement;
  export let afterSave: () => void = () => {};
  export let onCancel: () => void = () => {};

  const mutation = updateRefinement();

  let name = refinement.name;
  let description = refinement.description;

  $: handleSave = async () => {
    await $mutation.mutateAsync({ id: refinement.id, name, description });
    afterSave();
  };

  $: handleCancel = () => {
    onCancel();
  };
</script>

<div class="flex flex-col gap-2">
  <h3 class="text-xl font-semibold">Edit item</h3>
  <TextField label="Name" bind:value={name} />
  <TextAreaField label="Description" bind:value={description} />
  <div class="flex flex-row gap-2">
    <Button on:click={handleSave}>Save</Button>
    <Button on:click={handleCancel}>Cancel</Button>
  </div>
</div>
