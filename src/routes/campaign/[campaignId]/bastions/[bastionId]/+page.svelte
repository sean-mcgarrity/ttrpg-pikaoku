<script lang="ts">
  import Heading from '$components/layout/Heading.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  const bastion = {
    id: 1,
    name: "Titus's Tower of Truth",
    banner_src: 'https://i.imgur.com/Fa6YueK.jpeg'
  } as const;
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="col-span-2 flex flex-col gap-4">
    <div class="rounded-lg overflow-hidden">
      <img src={bastion.banner_src} alt="" class="object-contain" />
      <div class="p-2 bg-white text-offblack">
        <Heading type="Page Heading">{bastion.name}</Heading>
        Plase lawd
      </div>
    </div>
    <div class="flex flex-row justify-evenly">
      <div class="underliner">Features</div>
      <div>Retainers</div>
    </div>
    <div class="border border-white/20" />
    <div>
      <div class="border-2 border-white p-4">
        <div class="text-lg">Blacksmith</div>
        <div class="">blah blah blah</div>
        <div class="">- Craft a sword</div>
        <div class="">- Craft an axe</div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div>BLOOP</div>
  </div>
</div>
