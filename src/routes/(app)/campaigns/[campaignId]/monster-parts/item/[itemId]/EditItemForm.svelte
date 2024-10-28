<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ConfirmationModal from '$components/Modals/ConfirmationModal.svelte';
  import Button from '$components/buttons/Button.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import CharacterSelect from '$components/monster-parts/CharacterSelect.svelte';
  import {
    deleteRefinement,
    deleteRefinementImbuement,
    updateRefinement
  } from '$lib/persistance/monster-parts';
  import type { MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import { Save, Trash2, X } from 'lucide-svelte';

  interface Props {
    refinement: MP_Refinement;
    afterSave?: () => void;
  }

  let { refinement, afterSave = () => {} }: Props = $props();

  const mutation = updateRefinement();

  let name = $state(refinement.name);
  let description = $state(refinement.description);
  let ownerId = $state(refinement.owner_id?.toString());

  const removeImbuement = deleteRefinementImbuement();

  let deleteRefinementMutation = deleteRefinement();

  let campaignIdFromParams = $derived($page.params.campaignId);

  let handleSave = $derived(async () => {
    await $mutation.mutateAsync({
      id: refinement.id,
      name,
      description,
      owner_id: parseInt(ownerId) || refinement.owner_id
    });
    afterSave();
  });

  let imbuements = $derived(refinement.imbuements);
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
  <div class="flex flex-col gap-2 mt-6 px-6">
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

<!-- <div class="flex flex-row gap-2 justify-center mt-6">
  <ConfirmationModal
    onConfirm={() => {
      $deleteRefinementMutation.mutate(refinement.id, {
        onSuccess: () => {
          goto(`/campaigns/${campaignIdFromParams}/monster-parts`);
        }
      });
    }}
  >
    <Button slot="trigger">Delete Refinement <Trash2 /></Button>
    <div slot="message">
      This will premenantly delete {refinement.name} and refund all monster parts.
    </div>
  </ConfirmationModal>
</div> -->
