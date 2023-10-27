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
  import { REFINEMENT_BENEFITS, type ItemType } from '$lib/systems/pf2e_monster_parts.js';
  import { filterByLevelGt, reduceToHighestLevelLte, whereKeyEq } from '$lib/utils/iterators.js';
  import { ArrowDownIcon } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  $: campaignId = $page.params.campaignId;

  let name = '';
  let description = '';
  let baseItemKey = '';
  let owner = '';
  let type: ItemType = 'armor';

  const qMpBaseItems = queryMpBaseItems();
  const qPlayerCharacters = getCharactersQuery();
  const mCreateRefinement = mutateCreateRefinement();

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
  let seeAllLevels = false;
  $: typeBenefits = REFINEMENT_BENEFITS[type].filter((b) => b.benefits.length > 0);
  $: futureLevels = typeBenefits.filter(filterByLevelGt(0));
  $: baseItemOptions = ($qMpBaseItems.data ?? [])
    .filter((item) => item.type === type)
    .map((item) => ({
      text: `${item.name} (${Math.ceil((item.cost || 0) / 100)} MP)`,
      value: item.key
    }));
</script>

<div>
  <ContentBlock title="Create Item">
    <TextField label="Name" bind:value={name} />
    <TextField label="Description" bind:value={description} />
    <ItemTypeSelector bind:value={type} />
    <div class="text-center">
      <Button on:click={() => (seeAllLevels = !seeAllLevels)} class="mx-auto">
        <div>See refinement effects</div>
        <ArrowDownIcon class={seeAllLevels && 'rotate-180'} />
      </Button>
    </div>
    {#if seeAllLevels}
      <div class="px-8" transition:slide|local>
        {#each futureLevels as level}
          <div class="font-medium text-white/60">Level {level.level}:</div>
          <ul class="px-8 list-disc">
            {#each level.benefits as benefit}
              <li class="ml-4">{benefit}</li>
            {/each}
          </ul>
        {/each}
      </div>
    {/if}
    <SelectField label="Base Item" bind:value={baseItemKey} bind:options={baseItemOptions} />
    <SelectField label="Character" bind:value={owner} bind:options={playerCharacterOptions} />
    <svelte:fragment slot="buttons">
      <Button on:click={createItem}>Create <span class="text-xl">&plus;</span></Button>
    </svelte:fragment>
  </ContentBlock>
</div>
