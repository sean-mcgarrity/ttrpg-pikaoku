<script lang="ts">
  import { PinIcon } from 'lucide-svelte';
  import type { Quest } from 'src/app';
  import cx from 'classnames';

  export let quest: Quest;
  export let full = false;
</script>

<div
  class={cx(
    'relative flex flex-row p-3 rounded-l w-full gap-4 transition-all duration-150 bg-white/10',
    !full && 'shadow hover:scale-103 bg-white/10 rounded-r',
    'text-left items-start'
  )}
>
  <!-- <PinIcon class="custom-icon absolute -top-2 -rotate-45 -left-3 fill-white" /> -->
  <div class="flex flex-col">
    <div class="font-medium ">{quest.name}</div>
    <div class="text-sm font-light">Go to the place, kick down the princess, save the door.</div>
  </div>
</div>
