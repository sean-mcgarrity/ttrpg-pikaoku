<script lang="ts">
  import type { MP_UsableSource } from '$lib/systems/pf2e_monster_parts';
  import cs from 'classnames';

  interface Props {
    monster: MP_UsableSource;
    asLink?: boolean;
  }

  let { monster, asLink = false }: Props = $props();
</script>

{#if asLink}
  <a
    href={`/campaigns/${monster.campaign_id}/monster-parts/monsters/${monster.id}`}
    class={cs(
      'w-full transform transition duration-300 hover:scale-105 bg-white text-black overflow-hidden rounded shadow select-none',
      !monster.revealed && 'border-4 border-purple-800 border-solid bg-gray-400'
    )}
  >
    <div class="w-full flex flex-row h-full py-2">
      <div class="w-2/5 my-auto">
        <img
          src={monster.img_src}
          class="w-full h-[80px] object-center object-contain pointer-events-none"
          alt=""
        />
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
{:else}
  <div class="w-full bg-white text-black overflow-hidden rounded shadow">
    <div class="w-full flex flex-row h-full py-2">
      <div class="w-2/5 my-auto">
        <img
          src={monster.img_src}
          class="w-full h-[80px] object-center object-contain pointer-events-none"
          alt=""
        />
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
  </div>
{/if}
