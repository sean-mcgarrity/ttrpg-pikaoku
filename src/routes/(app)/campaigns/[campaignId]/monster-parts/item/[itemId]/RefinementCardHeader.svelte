<script lang="ts">
  import { calculateRefinementLevel, type MP_Refinement } from '$lib/systems/pf2e_monster_parts';
  import cs from 'classnames';

  interface Props {
    item: MP_Refinement;
  }

  let { item }: Props = $props();
  let itemLevel = $derived(calculateRefinementLevel(item));
</script>

<div
  class={cs(
    {
      'bg-refinement-armor': item.type === 'armor',
      'bg-refinement-weapon': item.type === 'weapon',
      'bg-refinement-skill': item.type === 'skill',
      'bg-refinement-perception': item.type === 'perception',
      'bg-refinement-shield': item.type === 'shield'
    },
    'flex flex-row text-white'
  )}
>
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
