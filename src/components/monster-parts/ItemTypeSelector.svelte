<script lang="ts">
  import { itemTypes, type ItemType } from '$lib/systems/pf2e_monster_parts';
  import { Axe, Shield, Eye, Scroll, Shirt } from 'lucide-svelte';

  export let value: ItemType = itemTypes[0].id;
</script>

<div class="flex flex-col gap-1 flex-wrap justify-between">
  <div>Item Type</div>
  {#each itemTypes as itemType}
    <label class="flex flex-row text-center cursor-pointer hover:bg-white/5 rounded">
      <input
        type="radio"
        bind:group={value}
        value={itemType.id}
        name="effect-type"
        class="hidden peer"
      />
      {#if itemType.id === 'weapon'}
        <Axe
          class="custom-icon h-10 w-10 p-1 aspect-square peer-checked:bg-blue-600 border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-l"
        />
      {/if}
      {#if itemType.id === 'armor'}
        <Shirt
          class="custom-icon h-10 w-10 p-1 aspect-square peer-checked:bg-blue-600 border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-l"
        />
      {/if}
      {#if itemType.id === 'shield'}
        <Shield
          class="custom-icon h-10 w-10 p-1 aspect-square peer-checked:bg-blue-600 border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-l"
        />
      {/if}
      {#if itemType.id === 'perception'}
        <Eye
          class="custom-icon h-10 w-10 p-1 aspect-square peer-checked:bg-blue-600 border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-l"
        />
      {/if}
      {#if itemType.id === 'skill'}
        <Scroll
          class="custom-icon h-10 w-10 p-1 aspect-square peer-checked:bg-blue-600 border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-l"
        />
      {/if}
      <span
        class="w-full inline-flex px-2 capitalize border-2 border-solid border-transparent peer-checked:border-blue-600 rounded-r"
      >
        <span class="my-auto">{itemType.label}</span></span
      >
    </label>
  {/each}
</div>
