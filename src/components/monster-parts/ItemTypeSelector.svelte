<script lang="ts">
  import { itemTypes, type ItemType } from '$lib/systems/pf2e_monster_parts';
  import { Axe, Shield, Eye, Scroll, Shirt } from 'lucide-svelte';

  export let value: ItemType = itemTypes[0].id;
</script>

<div>Item Type</div>
<div class="flex flex-row gap-4 flex-wrap justify-between">
  {#each itemTypes as itemType}
    <label class="flex flex-col text-center">
      <input
        type="radio"
        bind:group={value}
        value={itemType.id}
        name="effect-type"
        class="hidden peer"
      />
      {#if itemType.id === 'weapon'}
        <Axe
          class="bg-blue-900 custom-icon h-16 w-16 p-2 aspect-square rounded-full bg-white/5 outline cursor-pointer mb-2 border-2 border-white border-solid hover:bg-blue-500 hover:brightness-150 peer-checked:bg-blue-600 "
        />
      {/if}
      {#if itemType.id === 'armor'}
        <Shirt
          class="bg-blue-900 custom-icon h-16 w-16 p-2 aspect-square rounded-full bg-white/5 outline cursor-pointer mb-2 border-2 border-white border-solid hover:bg-blue-500 hover:brightness-150 peer-checked:bg-blue-600 "
        />
      {/if}
      {#if itemType.id === 'shield'}
        <Shield
          class="bg-blue-900 custom-icon h-16 w-16 p-2 aspect-square rounded-full bg-white/5 outline cursor-pointer mb-2 border-2 border-white border-solid hover:bg-blue-500 hover:brightness-150 peer-checked:bg-blue-600 "
        />
      {/if}
      {#if itemType.id === 'perception'}
        <Eye
          class="bg-blue-900 custom-icon h-16 w-16 p-2 aspect-square rounded-full bg-white/5 outline cursor-pointer mb-2 border-2 border-white border-solid hover:bg-blue-500 hover:brightness-150 peer-checked:bg-blue-600 "
        />
      {/if}
      {#if itemType.id === 'skill'}
        <Scroll
          class="bg-blue-900 custom-icon h-16 w-16 p-2 aspect-square rounded-full bg-white/5 outline cursor-pointer mb-2 border-2 border-white border-solid hover:bg-blue-500 hover:brightness-150 peer-checked:bg-blue-600 "
        />
      {/if}
      <span class="capitalize"
        >{itemType.label.slice(0, 6)}{itemType.label.length > 6 ? '.' : ''}</span
      >
    </label>
  {/each}
</div>
