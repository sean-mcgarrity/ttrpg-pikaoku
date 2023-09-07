<script lang="ts">
  export let progress: number;
  export let min: number;
  export let max: number;
  export let barColor: string;
</script>

<div class="relative h-2 w-full rounded-full my-2 mx-auto font-medium">
  <div class="absolute inset-0 bg-black/20" />
  <div
    class="absolute inset-0 bg-[#4444aa]"
    style={`width: ${progress}%;background-color: ${barColor}`}
  />
  <div
    class="absolute rounded w-4 aspect-square text-xs text-center -left-2 -top-1 rotate-45"
    style={`background-color: ${barColor}`}
  />
  <div
    class="absolute bg-white rounded w-4 aspect-square text-xs text-center -right-2 -top-1 rotate-45"
  />
  <div class="absolute text-white w-4 aspect-square text-xs text-center -left-2 -top-1">
    {min}
  </div>
  <div class="absolute text-black w-4 aspect-square text-xs text-center -right-2 -top-1">
    {max}
  </div>
</div>
