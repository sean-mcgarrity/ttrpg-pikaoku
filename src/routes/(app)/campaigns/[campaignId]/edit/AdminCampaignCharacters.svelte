<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import NewCharacter from '$components/forms/NewCharacter.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { deleteCharacterMutation, getCharactersQuery } from '$lib/persistance/campaign';
  import { Pencil, Trash, X } from 'lucide-svelte';

  const charactersQ = getCharactersQuery();
  $: characters = $charactersQ.data;
  const deleteCharM = deleteCharacterMutation();
  $: loading = $charactersQ.isLoading || $deleteCharM.isLoading;

  $: activeCharacters = characters?.filter((c) => c.active);
  $: otherCharacters = characters?.filter((c) => !c.active);

  $: handleDeleteCharacter = async (id: number) => {
    await $deleteCharM.mutate(id);
  };

  let editting = null;
  let editCharacter = (id: number) => {
    editting = id;
  };
</script>

<div class="">
  <Heading type="Subsection Heading">Characters</Heading>
  {#if loading}
    <div
      class="absolute inset-2 bg-black/60 rounded pointer-events-none flex transition-all duration-75"
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
            <div class="bg-blue-900 overflow-hidden rounded text-white grid grid-cols-2">
              <div class="p-4 flex flex-row gap-4">
                <img src={char.img_src} alt="" class="h-16 w-16" />
                <div>
                  <div class="text-lg font-bold">{char.name}</div>
                  <div class="">{char.active ? 'active' : 'inactive'}</div>
                </div>
              </div>
              <div class="grid grid-cols-1 ml-auto min-w-[10rem] font-bold p-2 gap-2">
                <Button on:click={() => (editting = null)}>Cancel <X /></Button>
                <Button>Delete <Trash /></Button>
              </div>
            </div>
          {:else}
            <div class="bg-blue-900 overflow-hidden rounded text-white grid grid-cols-2">
              <div class="p-4 flex flex-row gap-4">
                <img src={char.img_src} alt="" class="h-16 w-16" />
                <div>
                  <div class="text-lg font-bold">{char.name}</div>
                  <div class="">{char.active ? 'active' : 'inactive'}</div>
                </div>
              </div>
              <div class="grid grid-cols-1 ml-auto min-w-[10rem] font-bold p-2 gap-2">
                <Button on:click={() => (editting = char.id)}>Edit <Pencil /></Button>
                <Button>Delete <Trash /></Button>
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
