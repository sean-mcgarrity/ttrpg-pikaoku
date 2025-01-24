<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import { supabase } from '$lib/utils/auth';
  import { createMutation } from '@tanstack/svelte-query';

  const name = $state('');
  const img_src = $state('');

  const createCharacter = createMutation({
    mutationKey: ['create-character'],
    mutationFn: async () => {
      $supabase.from('character').insert({
        name: ''
      });
    }
  });
</script>

<Heading type="Page Heading">Create a new character</Heading>
<div class="bg-blue-800/20 p-8 rounded-lg shadow w-full max-w-xl mx-auto">
  <Heading type="Section Heading">1. Create a new character</Heading>
  <form
    onsubmit={() => $createCharacter.mutateAsync()}
    class="flex flex-col gap-4"
  >
    <label>
      <div class="mb-1">Name</div>
      <input
        value={name}
        placeholder="Choose an evokative name"
        class="w-4/5 px-4 py-2 rounded shadow-inner bg-black/10 text-white"
      />
    </label>

    <label>
      <div class="mb-1">Image source</div>
      <input
        value={img_src}
        placeholder="Choose an epic image"
        class="w-4/5 px-4 py-2 rounded shadow-inner bg-black/10 text-white"
      />
    </label>
  </form>
</div>

<div class="bg-blue-800/20 p-8 rounded-lg shadow w-full max-w-xl mx-auto">
  <Heading type="Section Heading">2. Choose a game system</Heading>
  <div class="flex flex-row gap-3">
    <button
      class="aspect-square bg-white/40 rounded-full w-20 flex justify-center items-center hover:bg-white/50 cursor-pointer"
    >
      pf2e
    </button>
    <button
      class="aspect-square bg-white/40 rounded-full w-20 flex justify-center items-center hover:bg-white/50 cursor-pointer"
    >
      BitD
    </button>
  </div>
</div>

<div class="bg-blue-800/20 p-8 rounded-lg shadow w-full max-w-xl mx-auto">
  <Heading type="Section Heading">3. Launch system character builder</Heading>
</div>
