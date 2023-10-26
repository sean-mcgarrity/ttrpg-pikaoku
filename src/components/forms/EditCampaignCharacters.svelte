<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import NewCharacter from '$components/forms/NewCharacter.svelte';
  import { deleteCharacterMutation, getCharactersQuery } from '$lib/persistance/meta';
  import { Trash } from 'lucide-svelte';

  const charactersQ = getCharactersQuery();
  const deleteCharM = deleteCharacterMutation();
  $: characters = $charactersQ.data;
  $: loading = $charactersQ.isLoading || $deleteCharM.isLoading;

  $: handleDeleteCharacter = async (id: number) => {
    await $deleteCharM.mutate(id);
  };

  let add = false;
</script>

<div class="relative bg-white bg-opacity-10 rounded px-16 py-8 flex flex-col gap-4">
  {#if loading}
    <div
      class="absolute inset-2 z-10 bg-black/60 rounded pointer-events-none flex transition-all duration-75"
    >
      <div
        class="m-auto text-black font-bold bg-white/80 px-8 py-4 rounded transition-all duration-75"
      >
        LOADING
      </div>
    </div>
  {:else}
    {#if characters.length}
      <div class="flex flex-col gap-4 mb-4">
        <div class="flex flex-row font-bold">
          <div class="flex-1 text-white">Name</div>
          <div class="flex-1 text-gray-300">Active</div>
          <button class="text-red-500 m-auto invisible" disabled>&bemptyv;</button>
        </div>
        {#each characters as char}
          <div class="flex flex-row gap-4">
            <div class="flex-1 text-white">{char.name}</div>
            <div class="flex-1 text-gray-300">{char.active ? 'active' : 'inactive'}</div>
            <Button on:click={() => handleDeleteCharacter(char.id)} class="m-auto">
              <Trash class="text-red-500" />
            </Button>
          </div>
        {/each}
      </div>
    {/if}
    {#if !characters.length}
      <div
        class="rounded-lg bg-white bg-opacity-10 text-center borer-white border-white py-4 border-4 border-dashed border-opacity-20"
      >
        <span class="text-lg uppercase text-white font-medium tracking-widest">No characters</span>
      </div>
    {/if}

    {#if !add}
      <Button class="mx-auto" on:click={() => (add = true)}>Add &#43;</Button>
    {/if}
    {#if add}
      <div class="w-full border-white border-opacity-20 border border-solid" />
      <NewCharacter
        afterSubmit={() => {
          add = false;
          loadCharacters();
        }}
        onCancel={() => (add = false)}
      />
    {/if}
  {/if}
</div>
