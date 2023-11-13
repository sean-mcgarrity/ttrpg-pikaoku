<script lang="ts">
  import Button from '$components/Button.svelte';
  import NewCharacter from '$components/forms/NewCharacter.svelte';
  import { deleteCharacterMutation, getCharactersQuery } from '$lib/persistance/meta';
  import { Trash } from 'lucide-svelte';

  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;
  const deleteCharM = deleteCharacterMutation();
  $: loading = $charactersQ.isLoading || $deleteCharM.isLoading;

  $: handleDeleteCharacter = async (id: number) => {
    await $deleteCharM.mutate(id);
  };

  let editting = null;
  let editCharacter = (id: number) => {
    editting = id;
  };
</script>

<div class="relative rounded px-16 py-8 flex flex-col gap-4">
  <h1 class="text-xl underline underline-offset-8">Characters</h1>
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
      <div class="flex flex-col gap-2 mb-4">
        {#each characters as char}
          {#if editting === char.id}
            <div class="bg-white overflow-hidden rounded text-black grid grid-cols-2">
              <div class="p-4">
                <div class="">{char.name}</div>
                <div class="">{char.active ? 'active' : 'inactive'}</div>
              </div>
              <div class="grid grid-cols-1 ml-auto min-w-[10rem] font-bold">
                <button class="bg-red-400" on:click={() => (editting = null)}> Cancel </button>
              </div>
            </div>
          {:else}
            <div class="bg-white overflow-hidden rounded text-black grid grid-cols-2">
              <div class="p-4">
                <div class="">{char.name}</div>
                <div class="">{char.active ? 'active' : 'inactive'}</div>
              </div>
              <div class="grid grid-cols-1 ml-auto min-w-[10rem] font-bold">
                <button class="bg-green-400" on:click={() => (editting = char.id)}> Edit </button>
                <button class="bg-red-400"> Delete </button>
              </div>
            </div>
          {/if}
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
    {#if editting}
      <div class="w-full border-white border-opacity-20 border border-solid" />
      <NewCharacter
        afterSubmit={() => {
          add = false;
        }}
        onCancel={() => (add = false)}
      />
    {/if}
  {/if}
</div>
