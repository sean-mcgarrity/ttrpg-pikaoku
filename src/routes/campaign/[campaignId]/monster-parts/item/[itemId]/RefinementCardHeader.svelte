<script lang="ts">
  import {
    calculateRefinementLevel,
    calculateSellCostOfRefinement,
    type MP_Refinement
  } from '$lib/systems/pf2e_monster_parts';

  export let item: MP_Refinement;
  $: itemLevel = calculateRefinementLevel(item);
  $: sellCost = calculateSellCostOfRefinement(item);
</script>

<div class="bg-[#6666cc] flex flex-row text-white">
  <div class="w-full px-4 py-2">
    <h1 class="text-2xl font-bold tracking-wide uppercase">
      {item.name}
    </h1>
    <div class="flex flex-row">
      <div class="font-medium capitalize tracking-wider text-white/80 text-lg">
        {item.owner?.name}'s
        {item.base_item.name}
      </div>
      <!-- <span class="text-white/60 ml-auto mt-auto">Sell {sellCost}GP</span> -->
    </div>
  </div>
  <div class="text-6xl font-extrabold px-4 py-2 bg-black/10 flex">
    <div class="m-auto font-mono">
      <span>{itemLevel}</span>
    </div>
  </div>
</div>
