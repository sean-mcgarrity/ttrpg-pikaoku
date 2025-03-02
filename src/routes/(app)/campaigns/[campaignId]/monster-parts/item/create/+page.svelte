<script lang="ts">
  import { run } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$components/buttons/Button.svelte';
  import SelectField from '$components/forms/controls/SelectField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import ContentBlock from '$components/layout/ContentBlock.svelte';
  import ItemTypeSelector from '$components/monster-parts/ItemTypeSelector.svelte';
  import { getCharactersQuery } from '$lib/persistance/campaign.js';
  import { mutateCreateRefinement, queryMpBaseItems } from '$lib/persistance/monster-parts.js';
  import { REFINEMENT_BENEFITS, type ItemType } from '$lib/systems/pf2e_monster_parts.js';
  import { filterByLevelGt, reduceToHighestLevelLte, whereKeyEq } from '$lib/utils/iterators.js';
  import { ArrowDownIcon } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  let campaignId = $derived($page.params.campaignId);

  let name = $state('');
  let description = $state('');
  let baseItemKey = $state('');
  let owner = $state('');
  let type: ItemType = $state('armor');

  const qMpBaseItems = queryMpBaseItems();
  const qPlayerCharacters = getCharactersQuery();
  const mCreateRefinement = mutateCreateRefinement();

  let playerCharacterOptions;
  run(() => {
    playerCharacterOptions = ($qPlayerCharacters.data ?? []).map((item) => ({
      text: item.name,
      value: item.id.toString()
    }));
  });

  let baseItems = $derived($qMpBaseItems.data ?? []);
  run(() => {
    type &&
      baseItems.find(whereKeyEq('key', baseItemKey))?.type !== type &&
      (baseItemKey = baseItems.find(whereKeyEq('type', type))?.key);
  });

  let createItem = $derived(() => {
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
          goto(`/campaigns/${campaignId}/monster-parts`);
        }
      }
    );
  });
  let seeAllLevels = $state(false);
  let typeBenefits = $derived(REFINEMENT_BENEFITS[type].filter((b) => b.benefits.length > 0));
  let futureLevels = $derived(typeBenefits.filter(filterByLevelGt(0)));
  let baseItemOptions;
  run(() => {
    baseItemOptions = ($qMpBaseItems.data ?? [])
      .filter((item) => item.type === type)
      .map((item) => ({
        text: `${item.name} (${Math.ceil((item.cost || 0) / 100)} MP)`,
        value: item.key
      }));
  });
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
      <div class="px-8" transition:slide>
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
    {#snippet buttons()}
      
        <Button on:click={createItem}>Create <span class="text-xl">&plus;</span></Button>
      
      {/snippet}
  </ContentBlock>
</div>
