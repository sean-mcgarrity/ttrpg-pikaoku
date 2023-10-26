<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import SelectField from '$components/forms/controls/SelectField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import ContentBlock from '$components/layout/ContentBlock.svelte';
  import ItemTypeSelector from '$components/monster-parts/ItemTypeSelector.svelte';
  import { getCharactersQuery } from '$lib/persistance/meta.js';
  import { mutateCreateRefinement, queryMpBaseItems } from '$lib/persistance/monster-parts.js';
  import type { ItemType } from '$lib/systems/pf2e_monster_parts.js';
  import { whereKeyEq } from '$lib/utils/iterators.js';

  $: campaignId = $page.params.campaignId;

  let name = '';
  let description = '';
  let baseItemKey = '';
  let owner = '';
  let type: ItemType = 'armor';

  const qMpBaseItems = queryMpBaseItems();
  const qPlayerCharacters = getCharactersQuery();
  const mCreateRefinement = mutateCreateRefinement();

  $: baseItemOptions = ($qMpBaseItems.data ?? []).map((item) => ({
    text: `${item.name} (${Math.ceil((item.cost || 0) / 100)} MP)`,
    value: item.key
  }));
  $: playerCharacterOptions = ($qPlayerCharacters.data ?? []).map((item) => ({
    text: item.name,
    value: item.id.toString()
  }));

  $: baseItems = $qMpBaseItems.data ?? [];
  $: type &&
    baseItems.find(whereKeyEq('key', baseItemKey))?.type !== type &&
    (baseItemKey = baseItems.find(whereKeyEq('type', type))?.key);

  $: createItem = () => {
    $mCreateRefinement.mutate(
      {
        name,
        description,
        base_item_key: baseItemKey,
        owner_id: parseInt(owner),
        type
      },
      {
        onSuccess: () => {
          goto(`/campaign/${campaignId}/monster-parts`);
        }
      }
    );
  };
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
