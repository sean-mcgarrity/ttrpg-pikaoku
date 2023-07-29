<script lang="ts">
  export let label: string;
  export let value: boolean;
</script>

<label
  class="flex flex-row gap-4 cursor-pointer px-4 py-2 rounded hover:bg-white hover:bg-opacity-10 mr-auto"
>
  <input type="checkbox" class="rounded px-4 py-1" bind:value />
  <div class="text-white font-medium">{label}</div>
</label>
