<script lang="ts">
  import { mpTraits } from '$lib/systems/pf2e_monster_parts';
  import { onMount } from 'svelte';
  import * as pf2eCore from '$lib/systems/pf2e_core';
  import { byKeyAsc } from '$lib/utils/iterators';
  import Button from '$components/Button.svelte';
  import cs from 'classnames';
  import { slide } from 'svelte/transition';
  import { ChevronDown, CopyX } from 'lucide-svelte';

  const panes = [
    'crafts',
    'attacks',
    'senses',
    'skills',
    'resistances',
    'weaknesses',
    'immunities',
    'abilities',
    'hardness',
    'traits',
    'speeds'
  ] as const;

  export let selected: string[];
  let expandedPane: (typeof panes)[number] = null;
  $: console.log('selected', selected);

  let resistances = [];
  let weaknesses = [];
  let immunities = [];
  let attacks = [];
  let senses = [];
  let skills = [];
  let traits = [];
  let abilities = [];
  let hardness = [];
  let crafts = [];
  let speeds = [];

  onMount(() => {
    const sortedDamageTypes = [...pf2eCore.DamageTypes].sort(byKeyAsc('name'));
    const sortedSkills = [...pf2eCore.Skills].sort(byKeyAsc('name'));
    const sortedAbilities = [...pf2eCore.Abilities].sort(byKeyAsc('name'));

    resistances = [...sortedDamageTypes.map((d) => `resist:${d.id}`)];
    weaknesses = [...sortedDamageTypes.map((d) => `weak:${d.id}`)];
    immunities = [...sortedDamageTypes.map((d) => `immune:${d.id}`)];
    attacks = [...sortedDamageTypes.map((c) => `attack:${c.id}`)];
    traits = [
      ...sortedDamageTypes.map((c) => `trait:${c.id}`),
      ...pf2eCore.CreatureTypes.map((c) => `trait:${c.id}`)
    ].sort();
    senses = [...pf2eCore.SenseTypes.map((s) => `sense:${s.id}`)];
    skills = [...sortedSkills.map((s) => `skill:${s.id}`)];
    abilities = [...sortedAbilities.map((a) => `ability:${a.id}`)];
    hardness = ['trait:hardness'];
    crafts = ['craft:shield', 'craft:armor_light', 'craft:armor_medium', 'craft:armor_heavy'];
    speeds = ['speed:flight'];
  });

  $: getTraitsForPane = (pane: (typeof panes)[number]) => {
    switch (pane) {
      case 'resistances':
        return resistances;
      case 'weaknesses':
        return weaknesses;
      case 'immunities':
        return immunities;
      case 'attacks':
        return attacks;
      case 'senses':
        return senses;
      case 'skills':
        return skills;
      case 'traits':
        return traits;
      case 'abilities':
        return abilities;
      case 'hardness':
        return hardness;
      case 'crafts':
        return crafts;
      case 'speeds':
        return speeds;
      default:
        return [];
    }
  };

  $: currentTraits = getTraitsForPane(expandedPane);
</script>

<div class="flex flex-col gap-1">
  <div class="w-full flex flex-row justify-between">
    <div class="text-lg">
      {selected.length === 0
        ? 'None'
        : selected.length === 1
        ? '1 trait'
        : `${selected.length} traits`} selected
    </div>
    <Button on:click={() => (selected = [])}>
      Deselect All <CopyX />
    </Button>
  </div>
  {#each panes as pane}
    {@const isActive = expandedPane === pane}
    <div class="rounded odd:bg-white/5 even:bg-black/10 p-2">
      <Button
        class={cs('capitalize', isActive && 'bg-blue-900 text-white')}
        on:click={() => {
          expandedPane = isActive ? null : pane;
        }}
      >
        <ChevronDown
          class={cs('transform transition-transform duration-500', !isActive && '-rotate-90')}
        />
        {pane}
        <span class="text-gray-500">
          [{getTraitsForPane(pane).filter((t) => selected.includes(t)).length}]
        </span>
      </Button>
      {#if isActive}
        <div class="grid grid-cols-3" transition:slide>
          {#each currentTraits as trait}
            {@const isActive = selected.includes(trait)}
            <Button
              class={cs(
                'm-1 capitalize transition-[outline] text-xs',
                isActive && 'outline outline-blue-600'
              )}
              on:click={() => {
                if (isActive) {
                  selected = [...selected.filter((s) => s !== trait)];
                } else {
                  selected = [...selected, trait];
                }
              }}
            >
              {trait.split(':')[1].replace('_', ' ')}
            </Button>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
