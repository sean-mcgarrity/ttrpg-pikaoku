<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import SelectField from '$components/forms/controls/SelectField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import ContentBlock from '$components/layout/ContentBlock.svelte';
  import ItemTypeSelector from '$components/monster-parts/ItemTypeSelector.svelte';
  import type { ItemType } from '$lib/systems/pf2e_monster_parts.js';
  import { byKeyAsc, whereKeyEq } from '$lib/utils/iterators.js';
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
  let type: ItemType = 'armor';

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
  $: type &&
    baseItems.find(whereKeyEq('key', baseItemKey))?.type !== type &&
    (baseItemKey = baseItems.find(whereKeyEq('type', type))?.key);
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
      .eq('campaign', campaignId)
      .then(({ data }) => {
        playerCharacters = data;
        owner = data[0].id;
      });
  });
</script>

<div>
  <ContentBlock title="Create Item">
    <TextField label="Name" bind:value={name} />
    <TextField label="Description" bind:value={description} />
    <ItemTypeSelector bind:value={type} />
    <SelectField label="Base Item" bind:value={baseItemKey} bind:options={baseItemOptions} />
    <SelectField label="Charater" bind:value={owner} bind:options={playerCharacterOptions} />
    <svelte:fragment slot="buttons">
      <Button on:click={createItem}>Create <span class="text-xl">&plus;</span></Button>
    </svelte:fragment>
  </ContentBlock>
</div>
