<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { ChevronDown, Pin } from 'lucide-svelte';
</script>

<div class="bg-blue-900 rounded overflow-hidden relative">
  <div class={'bg-blue-950 px-4 py-2 flex flex-row justify-between w-full'}>
    <div class="items-center flex flex-row font-medium gap-1 w-full">
      <Button title="Pin quest" disabled={true} class="!bg-gray-400 animate-pulse">
        <Pin class={'transition-transform duration-300 text-transparent'} />
      </Button>
      <Button title="Expand quest details" disabled={true} class="!bg-gray-400 animate-pulse">
        <ChevronDown class="transition-transform duration-300 text-transparent" />
      </Button>
      <div class="text-transparent bg-gray-400 animate-pulse mr-auto">
        Loading . . . . . . . . . . . . . . . . . . . .
      </div>
      <Button title="Expand quest details" disabled={true} class="!bg-gray-400 animate-pulse">
        <ChevronDown class="transition-transform duration-300 text-transparent" />
      </Button>
      <Button title="Expand quest details" disabled={true} class="!bg-gray-400 animate-pulse">
        <ChevronDown class="transition-transform duration-300 text-transparent" />
      </Button>
      <Button title="Expand quest details" disabled={true} class="!bg-gray-400 animate-pulse">
        <ChevronDown class="transition-transform duration-300 text-transparent" />
      </Button>
    </div>
  </div>
</div>
