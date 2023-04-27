<script>
  export let title;
</script>

<div
  class="bg-gray-300 border-2 border-offblack rounded shadow p-8 max-w-4xl mx-auto flex flex-col font-body text-offblack"
>
  <div class="flex flex-row items-center border-b border-offblack mb-1 pb-1 gap-2">
    <div
      class="border-2 border-double border-offblack px-4 text-center p-2 font-heading tracking-wide"
    >
      <div class="text font-semibold tracking-widest">TANDERVEIL</div>
      <div class="font-bold tracking-wide">NETS & GEAR</div>
      <div class="text-sm tracking-widest">HALF-OFF</div>
    </div>
    <div class="flex-1 flex flex-col text-center h-full border-r border-l border-offblack">
      <div class="text-6xl flex-1 py-4 font-title">OTARI OBSERVER</div>
      <div class="pt-1 border-t border-offblack mx-2 text-xs flex flex-row justify-between">
        <div class=" text-left">5 CP</div>
        <div class="flex-1 uppercase tracking-widest">Your source for news and events in Otari</div>
        <div class=" text-right">10th of Calistril 4721 AR</div>
      </div>
    </div>
    <div class="text-center break-words tracking-widest font-sans w-20">
      <div>YOUR</div>
      <div>LOCAL</div>
      <div>WEEKLY</div>
    </div>
  </div>
  <div class="border-t border-offblack tracking-tight">
    <slot />
  </div>
</div>
