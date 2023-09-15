<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import IntegerTicker from '$components/forms/controls/IntegerTicker.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { createMpSource } from '$lib/persistance/monster-parts';
  import { Save } from 'lucide-svelte';

  let name: string = '';
  let level: number = 1;
  let quantity: number = 1;
  let tags: string = '';

  $: campaignId = $page.params.campaignId;
  $: query = createMpSource();
  $: handleClick = () => {
    $query.mutate(
      {
        name,
        level,
        quantity,
        enables: tags.split(',').map((tag) => tag.trim())
      },
      {
        onSuccess: () => {
          goto(`/campaign/${campaignId}/monster-parts`);
        }
      }
    );
  };
</script>

<div class="flex flex-col sm:flex-row gap-4 w-full">
  <div class="flex flex-col gap-4 w-full">
    <div>New Monster</div>
    <div class="bg-white/10 p-4 rounded">
      <TextField label="Name" bind:value={name} />
      <div class="flex flex-row gap-4 mt-4">
        <IntegerTicker label="Level" min={-4} max={25} bind:value={level} />
        <IntegerTicker label="Quantity" min={1} max={30} bind:value={quantity} />
      </div>
      <div class="mt-4">
        <TextField bind:value={tags} label="Tags" placeholder="e.g. resist:fire, attack:cold" />
      </div>
    </div>
    <div class="mx-auto">
      <Button on:click={handleClick}>Create <Save /></Button>
    </div>
  </div>
  <div class="flex flex-col gap-4 w-full">
    <div>New Monster</div>
    <div>This is where I'd put my interactive ui for tags, if I had one.</div>
  </div>
</div>
