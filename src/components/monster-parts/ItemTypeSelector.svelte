<script lang="ts">
  import { itemTypes, type ItemType } from '$lib/systems/pf2e_monster_parts';

  export let value: ItemType = itemTypes[0].id;
</script>

<div>Choose ya bits</div>
<label for="effect-type">Item Type</label>
{#each itemTypes as itemType}
  <label>
    <input type="radio" bind:group={value} value={itemType.id} name="effect-type" />
    <span class="capitalize ml-2">{itemType.label}</span>
  </label>
{/each}
