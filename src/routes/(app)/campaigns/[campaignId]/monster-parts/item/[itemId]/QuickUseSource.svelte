<script lang="ts">
  import type { Imbuement, MP_UsableSource } from '$lib/systems/pf2e_monster_parts';
  import Button from '$components/buttons/Button.svelte';
  import { slide } from 'svelte/transition';
  import { Hammer } from 'lucide-svelte';
  import Modal from '$components/Modals/Modal.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import BigButton from '$components/buttons/BigButton.svelte';

  export let source: MP_UsableSource & { imbuement?: Imbuement };
  export let buttonText: string = 'Refine';
  export let actionText: string = 'Refining';
  export let onClick: (amount: number) => void;

  let value = source.usable;
  $: if (value > source.usable) value = source.usable;
  let showModal = false;
</script>

<button
  transition:slide|local
  class="w-full bg-white text-black overflow-hidden rounded shadow text-left transform transition duration-300 hover:scale-105"
  on:click={() => {
    showModal = true;
  }}
>
  <div class="w-full flex flex-row h-full py-2">
    <div class="w-2/5 my-auto">
      <img
        src={source.img_src}
        class="w-full h-[80px] object-center object-contain pointer-events-none"
        alt=""
      />
    </div>
    <div class="overflow-hidden flex flex-col">
      <div class="w-full py-2 font-semibold flex flex-row pr-2">
        <div
          class="flex-1 overflow-hidden whitespace-nowrap underline underline-offset-4 text-ellipsis"
        >
          <span class="">{source.name}</span>
        </div>
        <span class="text-right whitespace-nowrap">[{source.usable} MP]</span>
      </div>
      <div class="w-full max-h-[100px] text-ellipsis">
        <strong>{source.quantity}x</strong> level
        {source.level} monsters with {source.enables.length} traits
      </div>
      {#if !!source?.imbuement?.name}
        <div>
          Can improve your <strong>{source.imbuement.name}</strong> imbuement
        </div>
      {/if}
    </div>
  </div>
</button>
<Modal bind:showModal>
  <div class="text-center flex flex-col">
    <Heading type="Subsection Heading">Ready to {buttonText}?</Heading>
    <div class="flex flex-row mb-4">
      <div class="w-1/3">
        <img src={source.img_src} class="" alt="" />
      </div>
      <div class="flex-1 my-auto">
        {#if buttonText === 'Refine'}
          <p class="mb-4">
            Refining upgrades an item’s basic functionality and allows the item to be imbued with
            additional properties.
          </p>
          <p>
            How many <strong>{source.name}</strong> MP do you want to invest in your item?
          </p>
        {:else}
          <p class="mb-4">
            Imbueing an item adds a new set of abilities to your item that increase in potency the
            more you improve the imbuement.
          </p>
          <p>
            How many <strong>{source.name}</strong> MP do you want to invest in your
            <strong>{actionText}</strong> imbuement?
          </p>{/if}
      </div>
    </div>
    <input
      type="range"
      min="1"
      max={source.usable}
      bind:value
      class="quick-use-slider w-full my-auto bg-blue-950"
    />
    <p class="font-bold text-4xl">{value} MP</p>
    <div class="mt-6 text-black">
      <BigButton
        colorClasses="bg-blue-950 text-white text-center"
        on:click={() => {
          showModal = false;
          onClick(value);
        }}>{buttonText} <Hammer /></BigButton
      >
      <BigButton
        colorClasses="bg-transparent text-red-600 text-center shadow-none"
        on:click={() => {
          showModal = false;
        }}>Cancel</BigButton
      >
    </div>
  </div>
</Modal>
