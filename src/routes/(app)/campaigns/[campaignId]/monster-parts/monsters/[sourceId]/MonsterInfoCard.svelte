<script lang="ts">
  import type { MP_UsableSource } from '$lib/systems/pf2e_monster_parts';

  interface Props {
    monster: MP_UsableSource;
  }

  let { monster }: Props = $props();
</script>

<div class="bg-white rounded-xl p-8 max-w-md text-black flex flex-col mx-auto w-full gap-2">
  <img
    class="h-40 mx-auto pointer-events-none select-none"
    src={monster.img_src}
    draggable={false}
    alt=""
  />
  <h1 class="text-xl font-bold tracking-wide mx-auto">{monster.name}</h1>
  <p class="text-center">
    <span class="font-medium">{monster.quantity}</span> Level
    <span class="font-medium">{monster.level}</span>
    monsters with
    <span class="font-medium">{monster.usable}</span> usable MP
  </p>
  <p class="text-center">{monster.total - monster.usable} MP used so far</p>
  <div>
    <div class="underline font-medium">Traits</div>
    <div class="grid grid-cols-2">
      {#each monster.enables as trait}
        <span>{trait}</span>
      {/each}
    </div>
  </div>
</div>
