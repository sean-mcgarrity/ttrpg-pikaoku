<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$src/components/Button.svelte';
  import SelectField from '$src/components/forms/controls/SelectField.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';
  import ContentBlock from '$src/components/layout/ContentBlock.svelte';
  import { onMount } from 'svelte';

  type BaseItems = {
    key: string;
    name: string;
    type: string;
    cost: number;
    requires: string;
  }[];

  type PlayerCharacters = {
    id: string;
    name: string;
  }[];

  export let data;
  $: ({ supabase } = data);
  $: campaignId = $page.params.campaignId;

  const step = 'details';

  let name = '';
  let description = '';
  let baseItemKey = '';
  let owner = '';
  let type = 'armor';

  const typeOptions = [
    { text: 'Armor', value: 'armor' },
    { text: 'Weapon', value: 'weapon' },
    { text: 'Shield', value: 'shield' },
    { text: 'Skill Item', value: 'skill' },
    { text: 'Perception Item', value: 'perception' }
  ];

  let baseItems: BaseItems = [];
  $: baseItemOptions = baseItems
    .filter((item) => item.type === type)
    .map((item) => ({
      text: `${item.name} (${Math.ceil((item.cost || 0) / 100)} MP)`,
      value: item.key
    }));
  let playerCharacters: PlayerCharacters = [];
  $: playerCharacterOptions = playerCharacters.map((item) => ({
    text: item.name,
    value: item.id
  }));

  $: baseItem = baseItems.find((item) => item.key === baseItemKey);

  async function createItem() {
    const { data, error } = await supabase.from('refinements').insert([
      {
        name,
        description,
        base_item: baseItemKey,
        owner_id: owner,
        type,
        campaign_id: campaignId
      }
    ]);
    if (error) {
    } else {
      goto(`/campaign/${campaignId}/monster-parts`);
    }
  }

  onMount(() => {
    supabase
      .from('mp_base_items')
      .select('*')
      .then(({ data }) => {
        baseItems = data;
        baseItemKey = data[0].key;
      });
    supabase
      .from('player_characters')
      .select('*')
      .then(({ data }) => {
        playerCharacters = data;
        owner = data[0].id;
      });
  });
</script>

<div class="text-white">
  <div class="pt-8 mb-12 w-[320px] relative flex flex-row justify-between mx-auto">
    <div class="absolute top-[3.2rem] w-[95%] left-[5px] h-2 bg-blue-800/40" />
    <div class="h-12 w-12 aspect-square rounded-full bg-blue-800 outline outline-cyan-100" />
    <div class="h-12 w-12 aspect-square rounded-full bg-blue-800" />
    <div class="h-12 w-12 aspect-square rounded-full bg-blue-800" />
  </div>
  <ContentBlock title="Create Item">
    <TextField label="Name" bind:value={name} />
    <TextField label="Description" bind:value={description} />
    <SelectField label="Type" bind:value={type} options={typeOptions} />
    <SelectField label="Base Item" bind:value={baseItemKey} bind:options={baseItemOptions} />
    <SelectField label="Charater" bind:value={owner} bind:options={playerCharacterOptions} />
    <h2>Derived</h2>
    <div class="flex flex-col gap-4">
      Cost: {Math.ceil((baseItem?.cost || 0) / 100)} MP
    </div>
    <svelte:fragment slot="buttons">
      <Button on:click={createItem}>Create <span class="text-xl">&plus;</span></Button>
    </svelte:fragment>
  </ContentBlock>
</div>
