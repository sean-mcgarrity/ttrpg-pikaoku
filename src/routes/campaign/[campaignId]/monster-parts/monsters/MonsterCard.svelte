<script lang="ts">
  import type { MP_UsableSource } from '$lib/systems/pf2e_monster_parts';

  export let monster: MP_UsableSource;

  $: console.log('monster image sorce', monster.img_src);
</script>

<a
  href={`/campaign/${monster.campaign_id}/monster-parts/monsters/${monster.id}`}
  class="w-full transform transition duration-300 hover:scale-105 bg-white text-black overflow-hidden rounded shadow"
>
  <div class="w-full flex flex-row h-full">
    <div class="w-2/5 my-auto">
      <img src={monster.img_src} class="w-full h-[80px] object-center object-contain" alt="" />
    </div>
    <div class="overflow-hidden flex flex-col">
      <div class="w-full py-2 font-semibold flex flex-row px-2">
        <div
          class="flex-1 overflow-hidden whitespace-nowrap underline underline-offset-4 text-ellipsis"
        >
          <span class="">{monster.name}</span>
        </div>
        <span class="text-right whitespace-nowrap">[{monster.usable} MP]</span>
      </div>
      <div class="w-full p-2 max-h-[100px] text-ellipsis">
        <strong>{monster.quantity}x</strong> level
        {monster.level} monsters with {monster.enables.length} traits
      </div>
    </div>
  </div>
</a>
