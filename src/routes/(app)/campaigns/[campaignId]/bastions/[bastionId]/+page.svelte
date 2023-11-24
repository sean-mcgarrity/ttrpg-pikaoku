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
      </div>
    </div>
    <div>
      <div>
        <div class="grid grid-cols-2 text-center">
          <button class="rounded-tl-lg cursor-pointer bg-blue-800 hover:bg-blue-600 p-4"
            >Features</button
          >
          <button class="rounded-tr-lg cursor-pointer bg-blue-800 hover:bg-blue-600 p-4"
            >Retainers</button
          >
        </div>
      </div>
      <div class="flex flex-col gap-2 border-2 border-blue-800 p-2 bg-slate-900">
        <div class="rounded-sm border-2 shadow border-blue-900 px-4 py-2 bg-white/5">
          <div class="text-lg">Blacksmith</div>
          <div class="">- Craft a sword</div>
          <div class="">- Craft an axe</div>
        </div>
        <div class="rounded-sm border-2 shadow border-blue-900 px-4 py-2 bg-white/5">
          <div class="text-lg">Teleporation Circle</div>
          <div class="">- Craft a sword</div>
          <div class="">- Craft an axe</div>
        </div>
        <div class="rounded-sm border-2 shadow border-blue-900 px-4 py-2 bg-white/5">
          <div class="text-lg">Library</div>
          <div class="">- Craft a sword</div>
          <div class="">- Craft an axe</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div>BLOOP</div>
  </div>
</div>
