<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$src/components/AdminOnly.svelte';
  import Button from '$src/components/Button.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import CreateMpMonster from '$src/routes/(src)/campaign/[campaignId]/monster-parts/CreateMpMonster.svelte';

  $: campaignId = $page.params.campaignId;

  let monsters: MP_Monster[] = [
    {
      name: 'Monstro',
      level: 1,
      revealed: false,
      flags: []
    },
    {
      name: 'Orc',
      level: 4,
      revealed: false,
      flags: []
    },
    {
      name: 'Warthog',
      level: 12,
      revealed: false,
      flags: []
    }
  ];

  const addNewMonster = (monster: MP_Monster) => {
    monsters = [...monsters, monster];
  };

  let addingMonster = false;
</script>

<div class="text-white flex flex-col md:flex-row gap-4">
  <div class="w-full">
    <h1 class="font-bold mb-4">Monster Parts</h1>
    <div>
      <h2>Unused Monsters</h2>
      {#if monsters.length}
        <div class="flex flex-col gap-2 mb-4">
          {#each monsters as monster}
            <div class="bg-white/20 flex rounded overflow-hidden items-center">
              <div class="px-4 h-full py-2 w-12 text-center bg-white/40 text-black font-bold">
                {monster.level}
              </div>
              <span class="px-4 h-full">
                {monster.name}
              </span>
            </div>
          {/each}
        </div>
      {/if}
      {#if monsters.length === 0}
        <div>None</div>
      {/if}
      <Button on:click={() => (addingMonster = !addingMonster)}>Add Monster</Button>
      {#if addingMonster}
        <CreateMpMonster onFinish={addNewMonster} />
      {/if}
    </div>
    <div>
      <LinkButton href={`/campaign/${campaignId}/monster-parts/item/used`}
        >See Item Example &#8594;</LinkButton
      >
    </div>
  </div>
  <div class="w-full">
    <h2>Recent Updates</h2>
  </div>
</div>
<AdminOnly>
  <div class="text-white mt-8 text-center">
    <LinkButton href={`/campaign/${campaignId}/monster-parts/manage`}>Admin manage</LinkButton>
  </div>
</AdminOnly>
