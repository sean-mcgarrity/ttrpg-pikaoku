<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<label>
  <div class="text-white font-medium mb-2">{label}</div>
  <input type="text" class="rounded px-4 py-1 w-full bg-white bg-opacity-80" bind:value />
</label>
